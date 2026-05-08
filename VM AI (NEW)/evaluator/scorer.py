from pathlib import Path
import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image

BASE_DIR = Path(__file__).parent.parent
UICLIP_PATH    = BASE_DIR / "CLIP processor" / "models" / "uiclip"
PROCESSOR_PATH = BASE_DIR / "CLIP processor" / "models" / "clip-processor"

IMG_SIZE    = 224
LOGIT_SCALE = 100

# Each heuristic description is used as:
#   "ui screenshot. well-designed. <description>"  (good)
#   "ui screenshot. poor design. <description>"    (bad)
# Score = softmax([good_sim, bad_sim])[0] * 10
HEURISTICS = [
    {
        "id": "h1", "name": "Visibility of System Status",
        "weight": 1.0,
        "description": "showing breadcrumbs, loading spinners, progress bars, and highlighted active navigation states",
        "issue": "The interface may not clearly communicate current state or system status to users.",
        "solution": (
            "Add breadcrumb navigation, highlight the active menu item, show loading spinners "
            "during async operations, and use progress bars for multi-step flows."
        ),
    },
    {
        "id": "h2", "name": "Match Between System and Real World",
        "weight": 1.0,
        "description": "using plain everyday language with familiar icons like shopping cart, home button, and envelope",
        "issue": "The interface may use unfamiliar language or concepts that don't match users' mental models.",
        "solution": (
            "Replace technical jargon with plain language, use familiar icons (shopping cart, "
            "trash bin, envelope for email), and write labels from the user's perspective."
        ),
    },
    {
        "id": "h3", "name": "User Control and Freedom",
        "weight": 1.0,
        "description": "with clear back buttons, cancel buttons on forms, undo options, and close buttons on modals",
        "issue": "Users may feel trapped without clear undo, cancel, or exit options.",
        "solution": (
            "Add Cancel on all forms, include close (×) buttons on all modals, implement undo "
            "for destructive actions, and ensure the browser back button works correctly."
        ),
    },
    {
        "id": "h4", "name": "Consistency and Standards",
        "weight": 1.0,
        "description": "with uniform button styles, consistent color palette, and standardized component layout throughout",
        "issue": "Visual or behavioral inconsistencies may confuse users and increase cognitive load.",
        "solution": (
            "Define and follow a design system: standardize button styles, color usage, "
            "typography, spacing, and interactive patterns across all pages."
        ),
    },
    {
        "id": "h5", "name": "Error Prevention",
        "weight": 1.0,
        "description": "web form with required field asterisks, inline validation messages, and character count limits",
        "issue": "The interface may not prevent common user errors through validation and confirmation.",
        "solution": (
            "Add inline form validation, mark required fields with *, show input format hints "
            "(e.g. MM/DD/YYYY), and add confirmation dialogs before destructive actions like delete."
        ),
    },
    {
        "id": "h6", "name": "Recognition Rather Than Recall",
        "weight": 1.0,
        "description": "with labeled navigation buttons, visible menus, and descriptive text labels on all icon buttons",
        "issue": "Users may need to memorize information rather than recognizing visible options.",
        "solution": (
            "Label all icon-only buttons with text, make navigation permanently visible, "
            "show available options explicitly, and add tooltips to complex controls."
        ),
    },
    {
        "id": "h7", "name": "Flexibility and Efficiency of Use",
        "weight": 0.8,
        "description": "with prominent search bar, filter sidebar, sorting controls, and quick-access shortcuts",
        "issue": "The interface may not accommodate experienced users who need faster, more efficient interactions.",
        "solution": (
            "Add a persistent search bar, implement keyboard shortcuts, provide filters and sorting, "
            "allow users to save preferences, and offer quick-action shortcuts for frequent tasks."
        ),
    },
    {
        "id": "h8", "name": "Aesthetic and Minimalist Design",
        "weight": 1.0,
        "description": "clean minimal layout with generous whitespace, clear visual hierarchy, and focused essential content",
        "issue": "The interface may be visually cluttered, making it difficult to focus on primary content.",
        "solution": (
            "Remove non-essential elements, increase whitespace, establish clear visual hierarchy "
            "with type scale, make primary CTAs prominent, and de-emphasize secondary actions."
        ),
    },
    {
        "id": "h9", "name": "Help Recognize, Diagnose, and Recover from Errors",
        "weight": 0.9,
        "description": "with friendly inline error messages explaining what went wrong in plain language with suggested next steps",
        "issue": "Error messages may be unclear or unhelpful, leaving users unable to recover from mistakes.",
        "solution": (
            "Write error messages in plain language (no error codes), explain specifically what went "
            "wrong, tell users what to do next, and highlight the problematic field in red with an icon."
        ),
    },
    {
        "id": "h10", "name": "Help and Documentation",
        "weight": 0.7,
        "description": "with visible help center link in navigation, FAQ section, and contextual support tooltips on complex features",
        "issue": "The interface may lack accessible help resources for users who need guidance.",
        "solution": (
            "Add a Help link in the main navigation, create an FAQ page, include contextual "
            "tooltips for complex features, and consider an interactive onboarding tour for new users."
        ),
    },
]


class UIClipScorer:
    def __init__(self):
        print("  Loading UIClip model...")
        self.model = CLIPModel.from_pretrained(str(UICLIP_PATH)).eval()
        self.processor = CLIPProcessor.from_pretrained(str(PROCESSOR_PATH))

    # --- image helpers (sliding window, matches UIClip paper) ---

    def _preresize(self, image: Image.Image) -> Image.Image:
        ar = image.width / image.height
        if ar > 1:
            return image.resize((int(ar * IMG_SIZE), IMG_SIZE), Image.LANCZOS)
        return image.resize((IMG_SIZE, int(IMG_SIZE / ar)), Image.LANCZOS)

    def _slide_window(self, image: Image.Image) -> list:
        image = self._preresize(image)
        w, h = image.size
        sq = min(w, h)
        longer = max(w, h)
        n_steps = (longer + sq - 1) // sq
        step = (longer - sq) // (n_steps - 1) if n_steps > 1 else sq
        crops = []
        for y in range(0, h - sq + 1, step if h > w else sq):
            for x in range(0, w - sq + 1, step if w > h else sq):
                crops.append(image.crop((x, y, x + sq, y + sq)))
        return crops or [image]

    def _image_embedding(self, image: Image.Image) -> torch.Tensor:
        crops = self._slide_window(image)
        inputs = self.processor(images=crops, return_tensors="pt")
        with torch.no_grad():
            # Call vision_model + visual_projection directly — get_image_features
            # returns BaseModelOutputWithPooling on some transformers versions.
            vision_out = self.model.vision_model(pixel_values=inputs["pixel_values"])
            feats = self.model.visual_projection(vision_out.pooler_output)
        emb = feats.mean(dim=0, keepdim=True)
        return emb / emb.norm(dim=-1, keepdim=True)

    def _text_embedding(self, texts: list) -> torch.Tensor:
        inputs = self.processor(text=texts, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            text_out = self.model.text_model(
                input_ids=inputs["input_ids"],
                attention_mask=inputs["attention_mask"],
            )
            feats = self.model.text_projection(text_out.pooler_output)
        return feats / feats.norm(dim=-1, keepdim=True)

    # --- main scoring method ---

    def score(self, image: Image.Image) -> list:
        img_emb = self._image_embedding(image)
        results = []
        for h in HEURISTICS:
            good = f"ui screenshot. well-designed. {h['description']}"
            poor = f"ui screenshot. poor design. {h['description']}"
            txt_emb = self._text_embedding([good, poor])
            sims = (LOGIT_SCALE * img_emb @ txt_emb.T).squeeze(0)
            probs = sims.softmax(dim=0)
            results.append({
                "id":       h["id"],
                "name":     h["name"],
                "score":    round(probs[0].item() * 10, 2),
                "weight":   h["weight"],
                "issue":    h["issue"],
                "solution": h["solution"],
            })
        return results
