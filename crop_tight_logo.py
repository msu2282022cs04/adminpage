from PIL import Image

img = Image.open(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png")
w, h = img.size
pixels = img.load()

# Let's find columns where there is dense artwork (robot starts around x=200, finishes around x=770)
col_alpha = []
for x in range(w):
    count = sum(1 for y in range(h) if pixels[x, y][3] > 50)
    col_alpha.append((x, count))

# Find the main artwork boundaries
# The corner border lines have very low pixel density (< 20 pixels), whereas the main logo has high density (> 80 pixels)
dense_cols = [x for x, c in col_alpha if c > 40]
min_x = min(dense_cols)
max_x = max(dense_cols)

print("Main logo artwork range:", min_x, "to", max_x)

# Crop tight to the main logo artwork
cropped_logo = img.crop((min_x - 5, 0, max_x + 5, h))
bbox = cropped_logo.getbbox()
if bbox:
    cropped_logo = cropped_logo.crop(bbox)

cropped_logo.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png", "PNG")
print("Clean cropped logo saved! Size:", cropped_logo.size)
