import os
from PIL import Image
from collections import deque

src_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789973359517.png'
out_path = r'c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png'

img = Image.open(src_path).convert('RGBA')
w, h = img.size
pix = img.load()

# Create a new RGBA image
result = Image.new('RGBA', (w, h), (0, 0, 0, 0))
res_pix = result.load()

# Background color model in the banner:
# It is a smooth pastel gradient.
# Let's compute a local/interpolated background color for each pixel (x, y)
# Top-left bg is approx (218, 234, 250)
# Top-right bg is approx (235, 247, 245)
# Bottom-left bg is approx (222, 236, 249)
# Bottom-right bg is approx (221, 242, 235)

def get_bg_color(x, y):
    fx = x / max(1, w - 1)
    fy = y / max(1, h - 1)
    r = (1 - fy) * ((1 - fx) * 218 + fx * 235) + fy * ((1 - fx) * 222 + fx * 221)
    g = (1 - fy) * ((1 - fx) * 234 + fx * 247) + fy * ((1 - fx) * 236 + fx * 242)
    b = (1 - fy) * ((1 - fx) * 250 + fx * 245) + fy * ((1 - fx) * 249 + fx * 235)
    return (r, g, b)

# Flood fill to find all connected background pixels from border
visited = set()
queue = deque()

# Initialize queue with border pixels
for x in range(w):
    queue.append((x, 0))
    queue.append((x, h - 1))
for y in range(h):
    queue.append((0, y))
    queue.append((w - 1, y))

# Also add pixels that are clearly outer background margins:
# Left margin before robot: x < 210
# Right margin after wordmark: x > 925
# Top decorative bunting: y < 20 outside temple
for x in range(210):
    for y in range(h):
        queue.append((x, y))

for x in range(926, w):
    for y in range(h):
        queue.append((x, y))

# Bottom icons area that is cutoff: y >= 266
for x in range(w):
    for y in range(266, h):
        queue.append((x, y))

is_bg = [[False for _ in range(h)] for _ in range(w)]

def color_dist(c1, c2):
    return ((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2 + (c1[2] - c2[2])**2) ** 0.5

while queue:
    x, y = queue.popleft()
    if (x, y) in visited:
        continue
    visited.add((x, y))
    
    if not (0 <= x < w and 0 <= y < h):
        continue
        
    c = pix[x, y]
    bg_c = get_bg_color(x, y)
    dist = color_dist(c[:3], bg_c)
    
    # Check if pixel is background-like
    # Faint watermark lines or bunting have dist < 42
    # Background gradient has dist < 25
    # Artwork colors (saturated blues, darks, vibrant greens, golden yellow) have high dist
    # Robot white body has blue rim/contours, so flood fill naturally stops at the artwork contours!
    if dist < 40 or (x < 215 and dist < 65) or (x > 925 and dist < 65) or (y >= 266):
        is_bg[x][y] = True
        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                queue.append((nx, ny))

# Now construct the alpha matte and un-blend background
for y in range(h):
    for x in range(w):
        if is_bg[x][y]:
            res_pix[x, y] = (0, 0, 0, 0)
        else:
            c = pix[x, y]
            bg_c = get_bg_color(x, y)
            dist = color_dist(c[:3], bg_c)
            
            # Smooth edge anti-aliasing
            # If adjacent to a background pixel and dist is low, calculate alpha
            has_bg_neighbor = any(
                0 <= x+dx < w and 0 <= y+dy < h and is_bg[x+dx][y+dy]
                for dx, dy in [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (1,-1), (-1,1), (1,1)]
            )
            
            if has_bg_neighbor and dist < 48:
                # Alpha transition
                alpha = int(max(0, min(255, (dist / 48.0) * 255)))
                # Decontaminate background color
                r = int(max(0, min(255, c[0])))
                g = int(max(0, min(255, c[1])))
                b = int(max(0, min(255, c[2])))
                res_pix[x, y] = (r, g, b, alpha)
            else:
                res_pix[x, y] = c

# Find exact non-empty bounding box of the artwork
bbox = result.getbbox()
print('Artwork bbox:', bbox)

if bbox:
    cropped = result.crop(bbox)
    cropped.save(out_path, 'PNG')
    print(f'Saved cropped transparent logo to {out_path}, size: {cropped.size}')
