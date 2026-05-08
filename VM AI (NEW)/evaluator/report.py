import json
from datetime import date
from evaluator import messages

_SEV_ORDER     = {"high": 0, "medium": 1, "low": 2}
_GRADE_SCALE   = [(8.5, "A"), (7.5, "B+"), (6.5, "B"), (5.5, "C+"), (4.5, "C"), (3.5, "D"), (0.0, "F")]
_BAR_WIDTH     = 20


def _grade(score: float) -> str:
    for threshold, letter in _GRADE_SCALE:
        if score >= threshold:
            return letter
    return "F"


def _bar(score: float) -> str:
    filled = round(score / 10 * _BAR_WIDTH)
    return "█" * filled + "░" * (_BAR_WIDTH - filled)


def _severity(score: float) -> str:
    if score < 4.0:
        return "high"
    if score < 5.5:
        return "medium"
    if score < 7.0:
        return "low"
    return "pass"


def generate(clip_scores: list, element_issues: list, image_path: str, elements: list = None):
    """Return (dict, formatted_string) for the full evaluation report."""

    # Overall weighted score
    weighted = sum(h["score"] * h["weight"] for h in clip_scores)
    weight_total = sum(h["weight"] for h in clip_scores)
    overall = round(weighted / weight_total, 2)
    grade   = _grade(overall)

    # Build issue list from CLIP scores
    all_issues = []
    for h in clip_scores:
        sev = _severity(h["score"])
        if sev != "pass":
            if elements is not None:
                issue, solution = messages.build(h["id"], h["score"], elements)
            else:
                issue, solution = h["issue"], h["solution"]
            all_issues.append({
                "heuristic_id":   h["id"],
                "heuristic_name": h["name"],
                "score":          h["score"],
                "severity":       sev,
                "issue":          issue,
                "solution":       solution,
                "source":         "uiclip",
            })

    # Merge element-detector issues
    heuristic_map = {h["id"]: h["name"] for h in clip_scores}
    for ei in element_issues:
        all_issues.append({
            "heuristic_id":   ei["heuristic_id"],
            "heuristic_name": heuristic_map.get(ei["heuristic_id"], ei["heuristic_id"]),
            "severity":       ei["severity"],
            "issue":          ei["detail"],
            "solution":       ei["fix"],
            "source":         "detector",
        })

    all_issues.sort(key=lambda x: _SEV_ORDER.get(x["severity"], 9))

    report = {
        "file":             image_path,
        "date":             str(date.today()),
        "overall_score":    overall,
        "grade":            grade,
        "heuristic_scores": clip_scores,
        "issues":           all_issues,
    }

    return report, _format_text(report, clip_scores)


def _format_text(report: dict, clip_scores: list) -> str:
    W   = 82
    SEP = "─" * W
    DBL = "═" * W

    lines = [
        DBL,
        "NIELSEN UX HEURISTICS EVALUATION REPORT".center(W),
        DBL,
        f"  File  : {report['file']}",
        f"  Date  : {report['date']}",
        "",
        f"  OVERALL SCORE  {report['overall_score']:5.1f} / 10     Grade: {report['grade']}",
        "",
        SEP,
        "  HEURISTIC SCORES",
        SEP,
    ]

    for i, h in enumerate(clip_scores, 1):
        label    = f"H{i:<2}  {h['name']}"
        score_s  = f"{h['score']:4.1f}/10"
        sev_tag  = f"[{_severity(h['score']).upper()}]" if _severity(h["score"]) != "pass" else "  OK  "
        lines.append(f"  {label:<44} {score_s}  {_bar(h['score'])}  {sev_tag}")

    n = len(report["issues"])
    lines += ["", SEP, f"  ISSUES  ({n} found)", SEP]

    if not n:
        lines.append("  No issues detected — great work!")
    else:
        for iss in report["issues"]:
            tag = f"[{iss['severity'].upper()}]"
            lines.append(f"\n  {tag:<8}  {iss['heuristic_name']}")
            # Word-wrap issue and solution at ~70 chars
            lines.append(f"            Issue    : {iss['issue']}")
            lines.append(f"            Solution : {iss['solution']}")

    lines.append(DBL)
    return "\n".join(lines)


def save_json(report: dict, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
