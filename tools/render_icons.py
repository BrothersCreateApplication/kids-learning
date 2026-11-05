import math
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "brand"
SCALE = 2
SIZE = 1024


def color_mix(start, end, amount):
    return tuple(round(start[i] + (end[i] - start[i]) * amount) for i in range(3))


def star(draw, center, outer, inner, fill, points=5):
    cx, cy = center
    vertices = []
    for index in range(points * 2):
        radius = outer if index % 2 == 0 else inner
        angle = -math.pi / 2 + index * math.pi / points
        vertices.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    draw.polygon(vertices, fill=fill)


def render_base():
    size = SIZE * SCALE
    image = Image.new("RGB", (size, size), "#fff7e6")
    draw = ImageDraw.Draw(image)
    top = (222, 246, 233)
    bottom = (255, 229, 159)
    for y in range(size):
        amount = y / max(1, size - 1)
        draw.line((0, y, size, y), fill=color_mix(top, bottom, amount))

    def s(x):
        return round(x * SCALE)

    draw.ellipse((s(122), s(142), s(902), s(922)), fill="#fff9e9")
    draw.ellipse((s(10), s(680), s(300), s(970)), fill="#ffffff")
    draw.ellipse((s(802), s(42), s(1018), s(258)), fill="#ffffff")

    # Ears
    draw.polygon([(s(295), s(330)), (s(372), s(188)), (s(454), s(299))], fill="#f7aa40")
    draw.polygon([(s(729), s(330)), (s(652), s(188)), (s(570), s(299))], fill="#f7aa40")

    # Body and belly
    draw.ellipse((s(244), s(179), s(780), s(849)), fill="#f8ab40")
    draw.ellipse((s(349), s(364), s(675), s(781)), fill="#fff5d7")

    # Eyes
    draw.ellipse((s(302), s(349), s(508), s(555)), fill="#fffdf7")
    draw.ellipse((s(516), s(349), s(722), s(555)), fill="#fffdf7")
    draw.ellipse((s(376), s(420), s(466), s(510)), fill="#334151")
    draw.ellipse((s(558), s(420), s(648), s(510)), fill="#334151")
    draw.ellipse((s(424), s(436), s(450), s(462)), fill="#ffffff")
    draw.ellipse((s(606), s(436), s(632), s(462)), fill="#ffffff")

    # Beak and smile
    draw.polygon([(s(467), s(505)), (s(557), s(505)), (s(512), s(563))], fill="#f28b35")
    draw.chord((s(405), s(607), s(619), s(760)), 0, 180, fill="#f8a73b")

    # Wings
    draw.arc((s(135), s(530), s(350), s(780)), 120, 250, fill="#f4a03d", width=s(42))
    draw.arc((s(674), s(530), s(889), s(780)), -70, 60, fill="#f4a03d", width=s(42))

    # Feet
    draw.rounded_rectangle((s(408), s(842), s(442), s(888)), radius=s(10), fill="#ef9637")
    draw.rounded_rectangle((s(582), s(842), s(616), s(888)), radius=s(10), fill="#ef9637")

    # Sparkles
    star(draw, (s(174), s(220)), s(57), s(23), "#f4c544")
    star(draw, (s(839), s(403)), s(48), s(19), "#f7c947")
    draw.ellipse((s(814), s(768), s(858), s(812)), fill="#f4a4a6")
    draw.ellipse((s(718), s(176), s(746), s(204)), fill="#7eb9a0")
    return image


def save_square(image, size, filename):
    resized = image.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(OUTPUT / filename, "PNG", optimize=True)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    image = render_base()
    save_square(image, 1024, "icon-1024.png")
    save_square(image, 512, "icon-512.png")
    save_square(image, 512, "icon-maskable-512.png")
    save_square(image, 192, "icon-192.png")
    save_square(image, 180, "apple-touch-icon.png")
    save_square(image, 167, "icon-167.png")
    save_square(image, 152, "icon-152.png")
    save_square(image, 32, "favicon-32.png")

    crop_margin = round(image.width * 0.1)
    icon = image.crop(
        (crop_margin, crop_margin, image.width - crop_margin, image.height - crop_margin)
    ).resize((256, 256), Image.Resampling.LANCZOS)
    icon.save(OUTPUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"Rendered PWA icons into {OUTPUT}")


if __name__ == "__main__":
    main()
