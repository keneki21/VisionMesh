---
library_name: transformers
license: mit
datasets:
- biglab/jitteredwebsites-merged-224-paraphrased
- biglab/jitteredwebsites-merged-224-paraphrased-paired
- biglab/uiclip_human_data_hf
base_model:
- openai/clip-vit-base-patch32
- biglab/uiclip_jitteredwebsites-2-224-paraphrased_webpairs
---

# Model Card for Model ID

UIClip is a model designed to quantify the design quality and releveance of a user interface (UI) screenshot given a textual description.

### Model Description

UIClip is a model designed to quantify the design quality and releveance of a user interface (UI) screenshot given a textual description.
This model can also be used to generate natural language design suggestions (see paper).
This is a model described in the publication "UIClip: A Data-driven Model for Assessing User Interface Design" presented at UIST 2024 (https://arxiv.org/abs/2404.12500).

User interface (UI) design is a difficult yet important task for ensuring the usability, accessibility, and aesthetic qualities of applications. In our paper, we develop a machine-learned model, UIClip, for assessing the design quality and visual relevance of a UI given its screenshot and natural language description. To train UIClip, we used a combination of automated crawling, synthetic augmentation, and human ratings to construct a large-scale dataset of UIs, collated by description and ranked by design quality. Through training on the dataset, UIClip implicitly learns properties of good and bad designs by i) assigning a numerical score that represents a UI design's relevance and quality and ii) providing design suggestions. In an evaluation that compared the outputs of UIClip and other baselines to UIs rated by 12 human designers, we found that UIClip achieved the highest agreement with ground-truth rankings. Finally, we present three example applications that demonstrate how UIClip can facilitate downstream applications that rely on instantaneous assessment of UI design quality: i) UI code generation, ii) UI design tips generation, and iii) quality-aware UI example search.


- **Developed by:** BigLab
- **Model type:** CLIP-style Multi-modal Dual-encoder Transformer
- **Language(s) (NLP):** English
- **License:** MIT

### Example Code
```python
import torch
from transformers import CLIPProcessor, CLIPModel

IMG_SIZE = 224
DEVICE = "cpu" # can also be "cuda" or "mps"
LOGIT_SCALE = 100 # based on OpenAI's CLIP example code
NORMALIZE_SCORING = True

model_path="uiclip_jitteredwebsites-2-224-paraphrased_webpairs_humanpairs" # can also be regular or web pairs variants
processor_path="openai/clip-vit-base-patch32"

model = CLIPModel.from_pretrained(model_path)
model = model.eval()
model = model.to(DEVICE)

processor = CLIPProcessor.from_pretrained(processor_path)

def compute_quality_scores(input_list):
    # input_list is a list of types where the first element is a description and the second is a PIL image
    description_list = ["ui screenshot. well-designed. " + input_item[0] for input_item in input_list]
    img_list = [input_item[1] for input_item in input_list]
    text_embeddings_tensor = compute_description_embeddings(description_list) # B x H
    img_embeddings_tensor = compute_image_embeddings(img_list) # B x H

    # normalize tensors
    text_embeddings_tensor /= text_embeddings_tensor.norm(dim=-1, keepdim=True)
    img_embeddings_tensor /= img_embeddings_tensor.norm(dim=-1, keepdim=True)

    if NORMALIZE_SCORING:
        text_embeddings_tensor_poor = compute_description_embeddings([d.replace("well-designed. ", "poor design. ") for d in description_list]) # B x H
        text_embeddings_tensor_poor /= text_embeddings_tensor_poor.norm(dim=-1, keepdim=True)
        text_embeddings_tensor_all = torch.stack((text_embeddings_tensor, text_embeddings_tensor_poor), dim=1) # B x 2 x H
    else:
        text_embeddings_tensor_all = text_embeddings_tensor.unsqueeze(1)

    img_embeddings_tensor = img_embeddings_tensor.unsqueeze(1) # B x 1 x H

    scores = (LOGIT_SCALE * img_embeddings_tensor @ text_embeddings_tensor_all.permute(0, 2, 1)).squeeze(1)

    if NORMALIZE_SCORING:
        scores = scores.softmax(dim=-1)

    return scores[:, 0]

def compute_description_embeddings(descriptions):
    inputs = processor(text=descriptions, return_tensors="pt", padding=True)
    inputs['input_ids'] = inputs['input_ids'].to(DEVICE)
    inputs['attention_mask'] = inputs['attention_mask'].to(DEVICE)
    text_embedding = model.get_text_features(**inputs)
    return text_embedding

def compute_image_embeddings(image_list):
    windowed_batch = [slide_window_over_image(img, IMG_SIZE) for img in image_list]
    inds = []
    for imgi in range(len(windowed_batch)):
        inds.append([imgi for _ in windowed_batch[imgi]])

    processed_batch = [item for sublist in windowed_batch for item in sublist]
    inputs = processor(images=processed_batch, return_tensors="pt")
    # run all sub windows of all images in batch through the model
    inputs['pixel_values'] = inputs['pixel_values'].to(DEVICE)
    with torch.no_grad():
        image_features = model.get_image_features(**inputs)

    # output contains all subwindows, need to mask for each image
    processed_batch_inds = torch.tensor([item for sublist in inds for item in sublist]).long().to(image_features.device)
    embed_list = []
    for i in range(len(image_list)):
        mask = processed_batch_inds == i
        embed_list.append(image_features[mask].mean(dim=0))
    image_embedding = torch.stack(embed_list, dim=0)
    return image_embedding

def preresize_image(image, image_size):
    aspect_ratio = image.width / image.height
    if aspect_ratio > 1:
        image = image.resize((int(aspect_ratio * image_size), image_size))
    else:
        image = image.resize((image_size, int(image_size / aspect_ratio)))
    return image

def slide_window_over_image(input_image, img_size):
    input_image = preresize_image(input_image, img_size)
    width, height = input_image.size
    square_size = min(width, height)
    longer_dimension = max(width, height)
    num_steps = (longer_dimension + square_size - 1) // square_size

    if num_steps > 1:
        step_size = (longer_dimension - square_size) // (num_steps - 1)
    else:
        step_size = square_size

    cropped_images = []

    for y in range(0, height - square_size + 1, step_size if height > width else square_size):
        for x in range(0, width - square_size + 1, step_size if width > height else square_size):
            left = x
            upper = y
            right = x + square_size
            lower = y + square_size
            cropped_image = input_image.crop((left, upper, right, lower))
            cropped_images.append(cropped_image)

    return cropped_images


# compute the quality scores for a list of descriptions (strings) and images (PIL images)
prediction_scores = compute_quality_scores(list(zip(test_descriptions, test_images)))
```