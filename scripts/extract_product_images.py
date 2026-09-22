"""Extract raster packaging artwork from the supplied Curve brochure.

Run this locally only when the source brochure is updated:
    python scripts/extract_product_images.py
"""

from pathlib import Path

import pymupdf


SOURCE = Path(r"C:\Users\bhara\Downloads\leafler_Curve.pdf")
DESTINATION = Path(__file__).resolve().parents[1] / "public" / "products" / "source-extracts"


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    document = pymupdf.open(SOURCE)
    saved = 0
    seen: set[int] = set()

    for page_number, page in enumerate(document, start=1):
        for image_index, image in enumerate(page.get_images(full=True), start=1):
            xref = image[0]
            if xref in seen:
                continue
            seen.add(xref)
            image_data = document.extract_image(xref)
            extension = image_data["ext"]
            # The brochure stores an opaque PNG mask next to each usable JPEG.
            # Keep the actual photographic/package artwork only.
            if extension not in {"jpeg", "jpg"}:
                continue
            output = DESTINATION / f"page-{page_number:02d}-image-{image_index:02d}.{extension}"
            output.write_bytes(image_data["image"])
            saved += 1
            print(output)

    print(f"Extracted {saved} unique images.")


if __name__ == "__main__":
    main()
