from PIL import Image, ImageFilter
from collections import deque

# Load source image
src_path = r"C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789973359517.png"
img = Image.open(src_path).convert("RGBA")
w, h = img.size
print("Source size:", w, h)

# Let's inspect the colors across the image
# In media_1789973359517.png:
# The image has:
# Left: robot and decorative floral line
# Center-right: "தமிழி" in big bold 3D blue letters, with green leaf on top, "THAMILI" underneath, "அனைவருக்குமான அறிவுத்துணை" pill banner
# Background: very light cyan/white/grey gradient (#d6e6f5 to #eef5fb)

# Let's crop the actual logo area: Robot + Temple + தமிழி + THAMILI + leaf + pill banner
# Or Wordmark + leaf + robot
# Let's extract the main artwork (from robot x~220 to end of leaf/தமிழி x~800)
# Or from x=0 to w=939 if we key out the background everywhere!

# Let's do a precise alpha keying on the entire image or the logo area
# Background is all light colors: brightness > 200, low saturation, light blue tint.
# Elements:
# 1. Robot: Blue headset/cape (#0072ce, #004b9b), white face (#ffffff), dark eyes/smile (#001a3a), blue tablet
# 2. Temple: Deep blue/navy (#103a7a)
# 3. "தமிழி": Deep vibrant 3D blue gradient (#0045a5, #0077dd, #1a237e) with white inner contour and blue bevel
# 4. Leaf: Bright vivid green (#10b921, #059669)
# 5. "THAMILI": Dark navy blue text (#0a1f44)
# 6. Pill banner: Blue-to-green gradient pill (#0052cc to #00a843) with white Tamil text

# Let's flood-fill the background from borders and remove the light background gradient:
cw, ch = w, h
pixels = img.load()
visited = [[False for _ in range(cw)] for _ in range(ch)]
is_bg = [[False for _ in range(cw)] for _ in range(ch)]

def is_light_bg(r, g, b):
    # Background is light sky blue / off-white:
    # Brightness > 200, and relatively low chroma
    brightness = (r + g + b) / 3.0
    diff = max(r, g, b) - min(r, g, b)
    # Background pixels have high brightness and are not vivid green/blue/dark
    if brightness > 225 and diff < 60:
        return True
    if brightness > 190 and b >= r - 5 and g >= r - 10 and diff < 55:
        return True
    return False

queue = deque()

# Add all 4 outer borders to queue
for y in range(ch):
    r, g, b, a = pixels[0, y]
    if is_light_bg(r, g, b):
        queue.append((0, y))
        visited[y][0] = True
        is_bg[y][0] = True
    
    r, g, b, a = pixels[cw - 1, y]
    if is_light_bg(r, g, b):
        queue.append((cw - 1, y))
        visited[y][cw - 1] = True
        is_bg[y][cw - 1] = True

for x in range(cw):
    r, g, b, a = pixels[x, 0]
    if is_light_bg(r, g, b) and not visited[0][x]:
        queue.append((x, 0))
        visited[0][x] = True
        is_bg[0][x] = True
    
    r, g, b, a = pixels[x, ch - 1]
    if is_light_bg(r, g, b) and not visited[ch - 1][x]:
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
            if is_light_bg(r, g, b):
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
mask = mask.filter(ImageFilter.GaussianBlur(radius=0.5))
mask_pixels = mask.load()

for y in range(ch):
    for x in range(cw):
        r, g, b, a = pixels[x, y]
        alpha_val = mask_pixels[x, y]
        out_pixels[x, y] = (r, g, b, alpha_val)

# Also let's crop tight to non-transparent bounding box
bbox = out_img.getbbox()
if bbox:
    # Also let's ensure we crop out any leftover border decorative lines on the far left / right if present
    # The actual logo artwork (robot + temple + தமிழி + THAMILI + leaf + banner) is between x~200 and x~750
    # Let's inspect bbox
    print("Bounding box of transparent artwork:", bbox)
    # Let's crop to the actual logo artwork
    logo_artwork = out_img.crop((bbox[0], bbox[1], bbox[2], bbox[3]))
    logo_artwork.save(r"c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png", "PNG")
    print("Transparent thamili-logo.png saved successfully! Size:", logo_artwork.size)
