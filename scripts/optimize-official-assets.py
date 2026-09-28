from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    (ROOT / "public/images/team/official", 1400),
    (ROOT / "public/images/clinic/official", 2000),
]

before = after = 0
for directory, max_edge in TARGETS:
    for path in sorted(directory.glob("*.jpg")):
        before += path.stat().st_size
        with Image.open(path) as source:
            image = ImageOps.exif_transpose(source).convert("RGB")
            image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
            temp = path.with_suffix(".optimized.jpg")
            image.save(temp, "JPEG", quality=85, optimize=True, progressive=True)
        temp.replace(path)
        after += path.stat().st_size
        print(f"{path.relative_to(ROOT)}: {image.width}x{image.height}, {path.stat().st_size // 1024} KB")

print(f"Total: {before / 1048576:.1f} MB -> {after / 1048576:.1f} MB")
