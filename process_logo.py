from PIL import Image
import os

src_path = r"C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789972628851.png"
img = Image.open(src_path)
print("Image size:", img.size)

# Let's inspect different crop regions for the logo
# The image is wide: width x height
w, h = img.size

# The logo area includes the robot + "தமிழி THAMILI" text or just the "தமிழி THAMILI" text + leaf + robot
# Let's check bounding box
# Let's extract the full logo (Robot + "தமிழி THAMILI" branding)
# Let's save a full branding version and a text branding version
# Width is probably ~1000+, height ~400
# Let's check the coordinates of robot + தமிழி THAMILI
# From visual inspection of banner:
# Left ~ 20% to 80% contains Robot + Temple + தமிழி THAMILI + leaf + subtext

# Let's save crops to inspect
crop_full_logo = img.crop((int(w * 0.20), int(h * 0.05), int(w * 0.80), int(h * 0.65)))
crop_full_logo.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\crop_test1.png")

# Crop text + leaf + subtext
crop_text_logo = img.crop((int(w * 0.40), int(h * 0.15), int(w * 0.80), int(h * 0.62)))
crop_text_logo.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\crop_test2.png")

# Crop robot + text + leaf
crop_robot_and_text = img.crop((int(w * 0.22), int(h * 0.05), int(w * 0.78), int(h * 0.62)))
crop_robot_and_text.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\crop_test3.png")

print("Cropped test images saved.")
