"""Dynamic issue/solution message builder for each Nielsen heuristic.

Messages are generated from the actual CLIP score, detected UI element counts,
and — when Florence-2-base is available — semantic captions of each element.
Every evaluation produces factually different feedback tied to what was found.
"""

_IGNORE = {"BACKGROUND", "OTHER", "Background Image"}


def _counts(elements: list) -> dict:
    cls = [e["class"] for e in elements]
    return {
        "icons":      cls.count("Icon"),
        "buttons":    cls.count("Text Button"),
        "inputs":     sum(1 for c in cls if c in {"Input Field", "Checked View", "Switch"}),
        "text":       cls.count("Text"),
        "popups":     cls.count("Pop-Up Window"),
        "menus":      cls.count("Sliding Menu"),
        "paginators": cls.count("Page Indicator"),
        "total":      len([c for c in cls if c not in _IGNORE]),
    }


def _caps_by_class(elements: list) -> dict:
    """Group non-empty captions by element class."""
    groups: dict = {}
    for e in elements:
        cap = e.get("caption", "").strip()
        if cap:
            groups.setdefault(e["class"], []).append(cap)
    return groups


def _fmt_caps(caps: list, limit: int = 4) -> str:
    """Format a caption list as a readable inline string."""
    shown = [f'"{c}"' for c in caps[:limit]]
    suffix = f" (+{len(caps) - limit} more)" if len(caps) > limit else ""
    return ", ".join(shown) + suffix


def build(heuristic_id: str, score: float, elements: list) -> tuple:
    """Return (issue, solution) strings tailored to score and detected elements."""
    c    = _counts(elements)
    caps = _caps_by_class(elements)
    fn   = _BUILDERS.get(heuristic_id, _generic)
    return fn(score, c, caps)


# ── per-heuristic builders ──────────────────────────────────────────────────

def _h1(score, c, caps):
    s   = round(score, 1)
    nav = c["menus"] + c["paginators"]
    nav_caps = caps.get("Sliding Menu", []) + caps.get("Page Indicator", [])

    if score < 4.0:
        if nav_caps:
            detail = f"Navigation detected ({_fmt_caps(nav_caps)}) but active states and progress feedback appear absent."
        elif nav == 0:
            detail = "No navigation menus or status indicators were detected."
        else:
            detail = f"Only {nav} navigation element(s) found — active states and progress feedback appear absent."
        return (
            f"System status is critically unclear ({s}/10). {detail}",
            "Highlight the active page in navigation, add loading spinners for async operations, "
            "and show progress bars for multi-step flows. Every action should produce visible feedback within 1 second.",
        )
    if score < 5.5:
        return (
            f"System status feedback is lacking ({s}/10). "
            "The interface doesn't consistently tell users what's happening or where they are.",
            "Ensure the active menu item is visually highlighted, use skeleton screens during data loads, "
            "and confirm saves/deletes with a brief success or error notification.",
        )
    return (
        f"Status visibility could be stronger ({s}/10). "
        "Some states or transitions may not be clearly communicated.",
        "Review async operations for missing loading indicators and ensure every page "
        "highlights its active navigation item.",
    )


def _h2(score, c, caps):
    s     = round(score, 1)
    icons = c["icons"]
    icon_caps = caps.get("Icon", [])

    if score < 4.0:
        if icon_caps:
            icon_note = f" Icons found: {_fmt_caps(icon_caps)} — verify these match conventions users expect."
        elif icons > 3:
            icon_note = f" {icons} icon-based control(s) detected — without text labels their meaning may be cryptic."
        else:
            icon_note = ""
        return (
            f"Interface language feels foreign to users ({s}/10).{icon_note}",
            "Replace technical jargon with plain everyday language. Use universally recognized icons "
            "(shopping cart, envelope, trash bin) and pair each icon with a short text label.",
        )
    if score < 5.5:
        return (
            f"Some interface language or icons may not match user expectations ({s}/10). "
            "Terminology or visual metaphors may feel unfamiliar.",
            "Audit button labels and headings for jargon. Ensure icons follow common conventions "
            "and add tooltips where icon meanings may be ambiguous.",
        )
    return (
        f"Minor language or icon clarity improvements could help ({s}/10).",
        "Review any technical terms visible to users and confirm all icons match "
        "standard web conventions your audience would recognize.",
    )


def _h3(score, c, caps):
    s       = round(score, 1)
    popups  = c["popups"]
    buttons = c["buttons"]
    popup_caps  = caps.get("Pop-Up Window", [])
    button_caps = caps.get("Text Button", [])

    if score < 4.0:
        if popup_caps and not button_caps:
            popup_note = f" Modal detected ({_fmt_caps(popup_caps, 2)}) with no visible close or cancel button."
        elif popups > 0 and buttons == 0:
            popup_note = " A modal/pop-up was detected with no visible close or cancel button."
        else:
            popup_note = ""
        return (
            f"Users have critically limited control and freedom ({s}/10).{popup_note}",
            "Add a Cancel button to every form, a close (×) button to every modal, "
            "and an undo option for any destructive action. The browser back button must also work correctly.",
        )
    if score < 5.5:
        return (
            f"Escape routes and undo options are not prominent enough ({s}/10). "
            "Users may feel trapped when they make a mistake.",
            "Make Cancel/Close buttons visually distinct, implement undo for delete actions, "
            "and ensure modals can always be dismissed without completing the form.",
        )
    return (
        f"Control and freedom options could be more visible ({s}/10).",
        "Check that Cancel is always available on long forms and that every modal "
        "has a clearly visible close option.",
    )


def _h4(score, c, caps):
    s       = round(score, 1)
    buttons = c["buttons"]
    icons   = c["icons"]
    btn_caps = caps.get("Text Button", [])

    if score < 4.0:
        if btn_caps and icons > 0:
            mix_note = (
                f" Mixed controls found: buttons ({_fmt_caps(btn_caps, 3)}) alongside {icons} icon element(s) "
                "— inconsistent styles may be contributing."
            )
        elif buttons > 0 and icons > 0:
            mix_note = (
                f" {buttons} text button(s) and {icons} icon element(s) detected "
                "— mixed control styles may be contributing to inconsistency."
            )
        else:
            mix_note = ""
        return (
            f"Visual and behavioral inconsistency is severe ({s}/10).{mix_note}",
            "Define a design system: standardize button styles, color palette, typography, and spacing. "
            "Apply the same patterns for navigation, forms, and interactions across every page.",
        )
    if score < 5.5:
        return (
            f"Notable inconsistencies are present ({s}/10). "
            "Component styles or interaction patterns appear to vary across the interface.",
            "Audit for inconsistent button sizes, mixed color treatments, and varying icon styles. "
            "Align these to a single design language.",
        )
    return (
        f"Minor consistency improvements would polish the interface ({s}/10).",
        "Look for subtle differences in spacing, font weights, or button styles "
        "that could be unified under a consistent design pattern.",
    )


def _h5(score, c, caps):
    s      = round(score, 1)
    inputs = c["inputs"]
    text   = c["text"]
    input_caps = (
        caps.get("Input Field", []) + caps.get("Checked View", []) + caps.get("Switch", [])
    )

    if score < 4.0:
        if input_caps:
            input_note = (
                f" Form fields detected: {_fmt_caps(input_caps)} "
                f"with only {text} visible text label(s) — users lack guidance on what to enter."
            )
        elif inputs > 0:
            input_note = (
                f" {inputs} input field(s) detected with only {text} visible text label(s) — "
                "users are likely missing guidance on what to enter."
            )
        else:
            input_note = ""
        return (
            f"Error prevention is critically weak ({s}/10).{input_note}",
            "Add visible labels to every input, mark required fields with *, show inline format hints "
            "(e.g. MM/DD/YYYY), validate fields before submission, and require confirmation "
            "before destructive actions.",
        )
    if score < 5.5:
        if input_caps:
            field_note = f" Fields found: {_fmt_caps(input_caps)} — validation cues appear minimal."
        elif inputs > 0:
            field_note = f" {inputs} form input(s) detected but validation cues appear minimal."
        else:
            field_note = " Validation and confirmation patterns appear weak."
        return (
            f"The interface offers limited safeguards against user errors ({s}/10).{field_note}",
            "Add inline validation messages, highlight invalid fields in red with an explanation, "
            "and confirm irreversible actions (delete, submit payment) with a prompt.",
        )
    return (
        f"Some error prevention measures could be strengthened ({s}/10).",
        "Review forms for missing placeholder text and format hints. "
        "Ensure destructive actions require explicit confirmation.",
    )


def _h6(score, c, caps):
    s       = round(score, 1)
    icons   = c["icons"]
    buttons = c["buttons"]
    icon_caps = caps.get("Icon", [])

    if score < 4.0:
        if icon_caps:
            icon_note = (
                f" Icons detected: {_fmt_caps(icon_caps)} "
                f"with only {buttons} labeled button(s) — users must memorize each icon's meaning."
            )
        elif icons > 0:
            icon_note = (
                f" {icons} icon-only element(s) detected with {buttons} labeled button(s) — "
                "users must memorize each icon's meaning."
            )
        else:
            icon_note = ""
        return (
            f"Recognition is critically poor — users must rely on memory ({s}/10).{icon_note}",
            "Add text labels beneath or beside every icon control. Keep navigation permanently visible, "
            "show all available options explicitly, and use tooltips on any icon that must remain label-free.",
        )
    if score < 5.5:
        if icon_caps and icons > buttons:
            icon_note = (
                f" Icons found: {_fmt_caps(icon_caps)} "
                f"vs only {buttons} labeled button(s) — several controls have no text support."
            )
        elif icons > buttons:
            icon_note = f" {icons} icon(s) vs {buttons} labeled button(s) — several controls have no text support."
        else:
            icon_note = " Navigation or option visibility could be improved."
        return (
            f"Many elements require recall rather than recognition ({s}/10).{icon_note}",
            "Label the most-used icon buttons with text. Surface key actions in the main UI "
            "rather than hiding them in menus, and add tooltips to complex controls.",
        )
    return (
        f"A few controls could be more self-explanatory ({s}/10).",
        "Audit icon-only buttons and add tooltips or short text labels "
        "to any that aren't immediately obvious to first-time users.",
    )


def _h7(score, c, _):
    s = round(score, 1)
    if score < 4.0:
        return (
            f"Efficiency features are critically absent ({s}/10). "
            "No search, filtering, or shortcut mechanisms are visible.",
            "Add a persistent search bar, implement keyboard shortcuts for frequent actions, "
            "provide sort/filter controls on lists, and let users save personal preferences.",
        )
    if score < 5.5:
        return (
            f"Power users have few tools to speed up their workflow ({s}/10). "
            "The interface appears to offer a single interaction path for all users.",
            "Introduce a search bar if content is browseable, add column sorting and filtering "
            "to data tables, and document any existing keyboard shortcuts.",
        )
    return (
        f"Some efficiency shortcuts could benefit experienced users ({s}/10).",
        "Consider adding keyboard shortcuts for the most frequent actions and "
        "a quick-search feature if the interface contains navigable content.",
    )


def _h8(score, c, _):
    s     = round(score, 1)
    total = c["total"]
    if score < 4.0:
        clutter = (
            f" {total} UI elements were detected on-screen — the layout is heavily congested."
            if total > 0 else ""
        )
        return (
            f"The design is severely cluttered ({s}/10).{clutter}",
            "Remove non-essential elements, collapse secondary actions into overflow menus, "
            "increase whitespace between sections, and ensure the primary action stands out immediately.",
        )
    if score < 5.5:
        density = (
            f" {total} visible elements compete for attention."
            if total > 20 else " Reducing visual weight would improve focus."
        )
        return (
            f"The layout is busier than ideal ({s}/10).{density}",
            "Identify and remove decorative or redundant elements. Group related items, "
            "increase whitespace, and make the most important action visually dominant.",
        )
    return (
        f"A few non-essential elements could be removed for a cleaner look ({s}/10).",
        "Review each element and ask whether removing it would confuse the user. "
        "If not, consider removing or de-emphasizing it.",
    )


def _h9(score, c, caps):
    s      = round(score, 1)
    popups = c["popups"]
    popup_caps = caps.get("Pop-Up Window", [])

    if score < 4.0:
        if popup_caps:
            popup_note = (
                f" Dialog detected ({_fmt_caps(popup_caps, 2)}) — "
                "ensure it includes a plain-language error explanation and a clear next step."
            )
        elif popups > 0:
            popup_note = (
                " A pop-up or dialog was detected — ensure it includes a plain-language "
                "error explanation and a clear next step."
            )
        else:
            popup_note = ""
        return (
            f"Error recovery guidance is critically missing ({s}/10).{popup_note}",
            "Write all error messages in plain language — no error codes. State exactly what went wrong, "
            "highlight the problematic field in red, and tell the user specifically what to do next.",
        )
    if score < 5.5:
        return (
            f"Error messages appear unclear or incomplete ({s}/10). "
            "Users who hit a problem may not know how to recover.",
            "Replace generic messages like 'Something went wrong' with specific explanations. "
            "Always offer a suggested action (retry, contact support, go back).",
        )
    return (
        f"Error messaging could be more actionable ({s}/10).",
        "Review visible error states and ensure each one tells the user what went wrong "
        "and at least one concrete step to fix it.",
    )


def _h10(score, c, _):
    s = round(score, 1)
    if score < 4.0:
        return (
            f"Help and documentation are critically absent ({s}/10). "
            "No help links, tooltips, or onboarding cues are visible.",
            "Add a Help link in the main navigation, create an FAQ or knowledge base page, "
            "add contextual tooltips on complex controls, and consider an onboarding tour for new users.",
        )
    if score < 5.5:
        return (
            f"Help resources are limited and hard to find ({s}/10). "
            "Users who get stuck may have nowhere to turn.",
            "Ensure a Help or Support link is accessible in the header or footer. "
            "Add short tooltip hints on non-obvious controls and link to relevant docs from error messages.",
        )
    return (
        f"Help and documentation could be more accessible ({s}/10).",
        "Add contextual tooltips to complex features and make sure the help section "
        "is easy to find from every page.",
    )


def _generic(score, c, _):
    s = round(score, 1)
    if score < 4.0:
        return (
            f"This heuristic is critically violated ({s}/10).",
            "Review this area thoroughly and apply Nielsen's guideline for this principle.",
        )
    if score < 5.5:
        return (
            f"This heuristic needs significant improvement ({s}/10).",
            "Apply best practices for this usability principle to improve user experience.",
        )
    return (
        f"This heuristic could be strengthened ({s}/10).",
        "Make targeted improvements to better satisfy this usability guideline.",
    )


_BUILDERS = {
    "h1": _h1, "h2": _h2, "h3": _h3, "h4": _h4, "h5": _h5,
    "h6": _h6, "h7": _h7, "h8": _h8, "h9": _h9, "h10": _h10,
}
