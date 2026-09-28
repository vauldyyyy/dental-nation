"""Download and optimize the 15 treatment photos published on Dental Nation's services page.

Requires Pillow. The Wix media IDs are recorded here so each photograph remains
traceable to the clinic's own public service listing.
"""

from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "images" / "treatments" / "official"
DEST.mkdir(parents=True, exist_ok=True)

SOURCES = [
    ("fillings", "f2a471_2a2355a1794c4db3bd19f92f3d97cb2f~mv2.jpeg"),
    ("crowns-and-bridges", "f2a471_1b5b756bae034ac7a2e61178eb55f93c~mv2.jpeg"),
    ("root-canal-treatment", "f2a471_d7a4ce56eacb45b1a60fc71dd8edf7bf~mv2.jpeg"),
    ("teeth-cleaning", "f2a471_f619b5dbd97d485c822851f079b058ac~mv2.jpeg"),
    ("dentures-and-partial-dentures", "f2a471_bf0ad7162156471abc7136cb1c9edb1c~mv2.jpeg"),
    ("pediatric-dentistry", "f2a471_9ea070b3fd3a440181c904c085a08e51~mv2.jpeg"),
    ("extraction", "f2a471_6cb93a9d6ac842f8af43cb28ea3c3987~mv2.jpeg"),
    ("cosmetic-dentistry", "f2a471_95eca4b270b0441587da7b9a888bcf9e~mv2.png"),
    ("braces-and-aligners", "f2a471_0d0280215db043be9ac68c4133e7e633~mv2.jpeg"),
    ("dental-implants", "f2a471_7840f531d28b480c90a8c9373e44fb08~mv2.jpeg"),
    ("teeth-whitening", "f2a471_f81ab498402743c3b84eaa9c413cadd5~mv2.jpeg"),
    ("wisdom-tooth-removal", "f2a471_0057518726aa4ecebd22ecff1c23a55e~mv2.jpeg"),
    ("dental-x-ray", "f2a471_4250d4f951c343479460ec05b9bec73f~mv2.jpeg"),
    ("nightguard-and-mouthguard", "f2a471_935e9f3d0f144b7bb1b1a1a7724faf1a~mv2.jpeg"),
    ("gum-treatment", "f2a471_44c8607705f64614ab70be43f1a82740~mv2.jpeg"),
]

for slug, media_id in SOURCES:
    url = f"https://static.wixstatic.com/media/{media_id}"
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=30) as response:
        payload = response.read()
    with Image.open(BytesIO(payload)) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        image.thumbnail((1400, 1200), Image.Resampling.LANCZOS)
        output = DEST / f"{slug}.webp"
        image.save(output, "WEBP", quality=82, method=6)
        print(f"{slug}: {source.size} -> {image.size}, {output.stat().st_size // 1024} KB")
