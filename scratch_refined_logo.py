import os
from PIL import Image, ImageFilter
from collections import deque

src_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789973359517.png'
out_path = r'c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png'

img = Image.open(src_path).convert('RGBA')

# Crop to logo area
crop_box = (225, 12, 795, 265)
logo = img.crop(crop_box)
w, h = logo.size
pix = logo.load()

result = Image.new('RGBA', (w, h), (0, 0, 0, 0))
res_pix = result.load()

# Determine background color for any (x, y)
def get_bg(x, y):
    # Interpolate pastel background
    fx = x / max(1, w - 1)
    fy = y / max(1, h - 1)
    r = 214 * (1-fx) + 225 * fx
    g = 232 * (1-fx) + 242 * fx
    b = 248 * (1-fx) + 242 * fx
    return (r, g, b)

def is_fg_feature(x, y):
    r, g, b, _ = pix[x, y]
    # Check if pixel is part of artwork:
    # 1. Strong blue (text, robot accents, tablet, temple)
    if b > 140 and (b - r > 30 or b - g > 20):
        return True
    # 2. Strong green (leaf, banner, trees)
    if g > 110 and (g - r > 20 and g - b > 10):
        return True
    # 3. Yellow/Gold (sun, temple glow)
    if r > 200 and g > 170 and b < 180:
        return True
    # 4. Dark areas (robot visor, tablet screen, temple shadows, THAMILI text)
    if r < 140 and g < 160 and b < 180:
        return True
    # 5. Robot white hand & head body (high brightness, but part of robot geometry)
    # Robot is strictly in x: 0 to 220
    # Head center x: 70 to 180, y: 30 to 140
    # Hand center x: 10 to 60, y: 70 to 150
    if x < 235:
        # Distance from robot head/hand centers
        dist_head = ((x - 125)**2 + (y - 85)**2)**0.5
        if dist_head < 58:
            return True
        dist_hand = ((x - 38)**2 + (y - 110)**2)**0.5
        if dist_hand < 32:
            return True
        dist_chest = ((x - 130)**2 + (y - 165)**2)**0.5
        if dist_chest < 45:
            return True
        dist_ear_l = ((x - 68)**2 + (y - 75)**2)**0.5
        if dist_ear_l < 30:
            return True
        dist_ear_r = ((x - 188)**2 + (y - 95)**2)**0.5
        if dist_ear_r < 30:
            return True

    # 6. Tamil letters white bevel borders
    # Between x: 180 to 560, y: 100 to 230
    if 180 <= x <= 560 and 95 <= y <= 235:
        # Check if near a strong blue pixel within radius 8
        is_near_blue = False
        for dx in range(-6, 7, 2):
            for dy in range(-6, 7, 2):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h:
                    nr, ng, nb, _ = pix[nx, ny]
                    if nb > 150 and (nb - nr > 40):
                        is_near_blue = True
                        break
            if is_near_blue:
                break
        if is_near_blue and (r > 190 and g > 190 and b > 200):
            return True

    # 7. Pill banner & TAMIL-FIRST AI COMPANION text: y: 215 to 253
    if 70 <= x <= 500 and 215 <= y <= 253:
        if r < 180 or g > 130 or b > 140:
            return True
        # Text inside banner
        if y >= 218 and y <= 245 and 75 <= x <= 495:
            return True

    return False

# Build foreground mask
fg_mask = [[False for _ in range(h)] for _ in range(w)]
for x in range(w):
    for y in range(h):
        if is_fg_feature(x, y):
            fg_mask[x][y] = True

# Expand foreground mask slightly to ensure all anti-aliased edge fringes are kept intact
expanded = [[False for _ in range(h)] for _ in range(w)]
for x in range(w):
    for y in range(h):
        if fg_mask[x][y]:
            for dx in range(-2, 3):
                for dy in range(-2, 3):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        expanded[nx][ny] = True

# Now fill result
for y in range(h):
    for x in range(w):
        if not expanded[x][y]:
            res_pix[x, y] = (0, 0, 0, 0)
        else:
            c = pix[x, y]
            # Check edge smoothness
            has_empty_neighbor = any(
                0 <= x+dx < w and 0 <= y+dy < h and not expanded[x+dx][y+dy]
                for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]
            )
            if has_empty_neighbor:
                bg = get_bg(x, y)
                dist = ((c[0]-bg[0])**2 + (c[1]-bg[1])**2 + (c[2]-bg[2])**2)**0.5
                alpha = int(max(40, min(255, (dist / 40.0) * 255)))
                res_pix[x, y] = (c[0], c[1], c[2], alpha)
            else:
                res_pix[x, y] = c

bbox = result.getbbox()
print('Refined bbox:', bbox)
cropped = result.crop(bbox)
cropped.save(out_path, 'PNG')
print(f'Successfully saved transparent logo to {out_path}, size: {cropped.size}')
