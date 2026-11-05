import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads(
    (ROOT / "tools" / "animal-photo-manifest.json").read_text(encoding="utf-8")
)

columns = 6
cell_width = 220
cell_height = 196
rows = (len(manifest) + columns - 1) // columns
canvas = Image.new("RGB", (columns * cell_width, rows * cell_height), "#fffaf0")
draw = ImageDraw.Draw(canvas)
font = ImageFont.load_default(size=15)

for index, (animal_id, item) in enumerate(manifest.items()):
    image_path = ROOT / item["file"]
    if not image_path.exists():
        continue
    image = Image.open(image_path).convert("RGB")
    image = image.resize((cell_width - 18, 148), Image.Resampling.LANCZOS)
    x = (index % columns) * cell_width + 9
    y = (index // columns) * cell_height + 9
    canvas.paste(image, (x, y))
    draw.text((x + 4, y + 154), animal_id, fill="#273443", font=font)

output = ROOT / "qa-photo-contact-sheet.jpg"
canvas.save(output, "JPEG", quality=88)
print(output)
