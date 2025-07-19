import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import tempfile

def extract_text_from_pdf(pdf_path):
    with tempfile.TemporaryDirectory() as tempdir:
        images = convert_from_path(pdf_path, dpi=300, output_folder=tempdir)
        full_text = ''
        for image in images:
            text = pytesseract.image_to_string(image)
            full_text += text + '\n'
        return full_text
