import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads(
    (ROOT / "tools" / "vehicle-photo-manifest.json").read_text(encoding="utf-8")
)
columns = 5
cell_width = 230
cell_height = 210
rows = (len(manifest) + columns - 1) // columns
canvas = Image.new("RGB", (columns * cell_width, rows * cell_height), "#fffaf0")
draw = ImageDraw.Draw(canvas)
font = ImageFont.load_default(size=16)

for index, (vehicle_id, item) in enumerate(manifest.items()):
    image = Image.open(ROOT / item["file"]).convert("RGB")
    image = image.resize((cell_width - 18, 158), Image.Resampling.LANCZOS)
    x = (index % columns) * cell_width + 9
    y = (index // columns) * cell_height + 9
    canvas.paste(image, (x, y))
    draw.text((x + 4, y + 164), vehicle_id, fill="#273443", font=font)

output = ROOT / "qa-vehicle-contact-sheet.jpg"
canvas.save(output, "JPEG", quality=88)
print(output)
