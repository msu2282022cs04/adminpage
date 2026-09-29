from PIL import Image, ImageFilter
from collections import deque

src_path = r"C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789972628851.png"
img = Image.open(src_path).convert("RGBA")
w, h = img.size

# Let's crop the main branding area accurately:
# Width is 1024, Height is 418.
# The robot starts at around x=235, top y=0 to y=290
# The text "தமிழி", leaf, "THAMILI", sub-banner "அனைவருக்குமான அறிவுத்துணை" extends to x=825, y=300
crop_box = (int(w * 0.235), int(h * 0.01), int(w * 0.815), int(h * 0.70))
logo_crop = img.crop(crop_box)
cw, ch = logo_crop.size

pixels = logo_crop.load()

# Let's flood-fill background from the edges
visited = [[False for _ in range(cw)] for _ in range(ch)]
is_bg = [[False for _ in range(cw)] for _ in range(ch)]

def is_background_color(r, g, b):
    # Background in the banner is light sky blue / off-white:
    # R > 195, G > 210, B > 230, and b >= r
    brightness = (r + g + b) / 3.0
    diff = max(r, g, b) - min(r, g, b)
    if brightness > 230:
        return True
    if brightness > 195 and b >= r and (g >= r - 12) and (diff < 65):
        return True
    return False

queue = deque()

# Add all 4 borders to queue
for y in range(ch):
    r, g, b, a = pixels[0, y]
    if is_background_color(r, g, b):
        queue.append((0, y))
        visited[y][0] = True
        is_bg[y][0] = True
    
    r, g, b, a = pixels[cw - 1, y]
    if is_background_color(r, g, b):
        queue.append((cw - 1, y))
        visited[y][cw - 1] = True
        is_bg[y][cw - 1] = True

for x in range(cw):
    r, g, b, a = pixels[x, 0]
    if is_background_color(r, g, b) and not visited[0][x]:
        queue.append((x, 0))
        visited[0][x] = True
        is_bg[0][x] = True
    
    r, g, b, a = pixels[x, ch - 1]
    if is_background_color(r, g, b) and not visited[ch - 1][x]:
        queue.append((x, ch - 1))
        visited[ch - 1][x] = True
        is_bg[ch - 1][x] = True

while queue:
    cx, cy = queue.popleft()
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nx, ny = cx + dx, cy + dy
        if 0 <= nx < cw and 0 <= ny < ch and not visited[ny][nx]:
            visited[ny][nx] = True
            r, g, b, a = pixels[nx, ny]
            if is_background_color(r, g, b):
                is_bg[ny][nx] = True
                queue.append((nx, ny))

# Create transparent image with smooth alpha
out_img = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
out_pixels = out_img.load()

# Create alpha mask
mask = Image.new("L", (cw, ch), 255)
mask_pixels = mask.load()

for y in range(ch):
    for x in range(cw):
        if is_bg[y][x]:
            mask_pixels[x, y] = 0

# Apply gentle blur on mask for smooth antialiasing
mask = mask.filter(ImageFilter.GaussianBlur(radius=0.6))
mask_pixels = mask.load()

for y in range(ch):
    for x in range(cw):
        r, g, b, a = pixels[x, y]
        alpha_val = mask_pixels[x, y]
        out_pixels[x, y] = (r, g, b, alpha_val)

# Also let's crop tight to non-transparent bounding box
bbox = out_img.getbbox()
if bbox:
    out_img = out_img.crop(bbox)

out_img.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png", "PNG")
print("Clean transparent thamili-logo.png created successfully! Size:", out_img.size)
