# Actual classes from class_map_vins_manual.json (idx2Label):
#   0=BACKGROUND, 1=OTHER, 2=Background Image, 3=Checked View,
#   4=Icon, 5=Input Field, 6=Image, 7=Text, 8=Text Button,
#   9=Page Indicator, 10=Pop-Up Window, 11=Sliding Menu, 12=Switch

FORM_CLASSES   = {"Input Field", "Checked View", "Switch"}
NAV_CLASSES    = {"Sliding Menu", "Page Indicator"}
STATUS_CLASSES = {"Page Indicator", "Pop-Up Window"}
IGNORE_CLASSES = {"BACKGROUND", "OTHER", "Background Image"}

CLUTTER_THRESHOLD   = 35   # meaningful elements above this → aesthetic issue
ICON_TEXT_RATIO_MAX = 3.0  # icons-to-text-buttons ratio above this → unlabeled icons issue


def check(elements: list, clip_scores: list) -> list:
    """Rule-based checks on detected UI elements, returning extra issues."""
    if not elements:
        return []

    classes   = [e["class"] for e in elements]
    class_set = set(classes)

    # Exclude background/decorative from count
    meaningful = [c for c in classes if c not in IGNORE_CLASSES]
    issues = []

    # H1 — no navigation or status elements
    if not class_set & (NAV_CLASSES | STATUS_CLASSES):
        issues.append({
            "heuristic_id": "h1",
            "severity": "medium",
            "detail": "No navigation or status elements (menus, pagination, modals) detected.",
            "fix": "Add a visible navigation menu or breadcrumbs, and show status feedback for system actions.",
        })

    # H3 — modal present but no button to close it
    if "Pop-Up Window" in class_set and "Text Button" not in class_set:
        issues.append({
            "heuristic_id": "h3",
            "severity": "high",
            "detail": "A pop-up or modal was detected but no close/confirm button found inside it.",
            "fix": "Always include a clearly visible Close (×) or Cancel button inside every modal.",
        })

    # H5 — inputs exist but no Text labels nearby
    n_inputs = sum(1 for c in classes if c in FORM_CLASSES)
    n_text   = classes.count("Text")
    if n_inputs > 0 and n_text < n_inputs:
        issues.append({
            "heuristic_id": "h5",
            "severity": "high",
            "detail": f"{n_inputs} form input(s) detected but only {n_text} text label(s) visible.",
            "fix": "Add a visible text label above or beside every form field to prevent input errors.",
        })

    # H6 — icon-heavy UI with few labeled buttons
    n_icons   = classes.count("Icon")
    n_buttons = classes.count("Text Button")
    if n_icons > 3 and n_buttons > 0 and (n_icons / n_buttons) > ICON_TEXT_RATIO_MAX:
        issues.append({
            "heuristic_id": "h6",
            "severity": "medium",
            "detail": f"{n_icons} icons detected vs only {n_buttons} labeled button(s) — many controls may be icon-only.",
            "fix": "Add text labels to icon buttons or use tooltips so users don't need to memorize what each icon does.",
        })
    elif n_icons > 3 and n_buttons == 0:
        issues.append({
            "heuristic_id": "h6",
            "severity": "high",
            "detail": f"{n_icons} icon elements detected with no labeled text buttons.",
            "fix": "Replace icon-only controls with icon + text buttons, or add visible tooltips.",
        })

    # H8 — too many meaningful elements on screen
    if len(meaningful) > CLUTTER_THRESHOLD:
        issues.append({
            "heuristic_id": "h8",
            "severity": "high",
            "detail": f"{len(meaningful)} UI elements detected — the layout appears cluttered.",
            "fix": "Remove non-essential elements, group related items, and move secondary actions into overflow menus.",
        })

    return issues
