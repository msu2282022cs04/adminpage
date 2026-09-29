from PIL import Image

src_path = r"C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789973359517.png"
img = Image.open(src_path)
print("media_1789973359517.png format:", img.format, "size:", img.size, "mode:", img.mode)

# Save the exact untouched source image directly as assets/images/thamili-logo.png
# and also assets/images/thamili-logo-source.png
img.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png", quality=100)
print("Saved exact attached image as thamili-logo.png")
