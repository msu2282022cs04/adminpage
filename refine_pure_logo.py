import os
from PIL import Image

src_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789973359517.png'
out_path = r'c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png'

img = Image.open(src_path).convert('RGBA')
w, h = img.size
pix = img.load()

res = Image.new('RGBA', (w, h), (0, 0, 0, 0))
rpix = res.load()

# Artwork bounding box:
# x: [225, 735], y: [16, 265]

def is_inside_artwork(x, y):
    if not (225 <= x <= 735 and 16 <= y <= 265):
        return False

    r, g, b, _ = pix[x, y]

    # 1. Robot
    if x < 445:
        # Hand (225 to 290, 80 to 155)
        if 225 <= x <= 290 and 80 <= y <= 155:
            if ((x - 262)**2 + (y - 118)**2)**0.5 < 28 or (x >= 240 and y >= 115):
                return True
        # Head / Headset (275 to 420, 45 to 175)
        if 275 <= x <= 420 and 45 <= y <= 175:
            if ((x - 350)**2 + (y - 97)**2)**0.5 < 54:
                return True
            if ((x - 295)**2 + (y - 88)**2)**0.5 < 28:
                return True
            if ((x - 410)**2 + (y - 105)**2)**0.5 < 24:
                return True
            if ((x - 395)**2 + (y - 140)**2)**0.5 < 18:
                return True
        # Cape / Body / Tablet / Waves
        if 225 <= x <= 445 and 135 <= y <= 260:
            return True

    # 2. Temple & Sun & Trees (420 to 645, 16 to 145)
    if 420 <= x <= 645 and 16 <= y <= 145:
        # Temple gopuram
        if 475 <= x <= 565 and 16 <= y <= 145:
            return True
        # Sun
        if 420 <= x <= 500 and 50 <= y <= 140:
            if ((x - 460)**2 + (y - 95)**2)**0.5 < 45:
                return True
        # Trees
        if 565 <= x <= 645 and 65 <= y <= 140:
            if (g > 60 and g - r > 10) or (b > 70 and b - r > 10) or (r < 80 and g < 80 and b < 100):
                return True

    # 3. Green leaves (610 to 730, 45 to 160)
    if 610 <= x <= 730 and 45 <= y <= 160:
        if g > 90 and (g - r > 10 or g - b > 5):
            return True
        if ((x - 670)**2 + (y - 105)**2)**0.5 < 46 and (g > 75 or (r > 175 and g > 195 and b > 175)):
            return True

    # 4. 3D Tamil wordmark (தமிழி)
    if 395 <= x <= 735 and 90 <= y <= 225:
        # Blue letters & cyan bevel & white rim
        if b > 120 and (b - r > 20 or b - g > 10):
            return True
        if b > 150 and g > 110:
            return True
        # White rim around letters
        if r > 180 and g > 190 and b > 210:
            # Check if within distance 6 of deep blue
            for dx in range(-6, 7, 2):
                for dy in range(-6, 7, 2):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        if pix[nx, ny][2] > 140 and pix[nx, ny][2] - pix[nx, ny][0] > 30:
                            return True
        if r < 80 and g < 90 and b < 130:
            return True

    # 5. THAMILI text
    if 460 <= x <= 680 and 205 <= y <= 230:
        if r < 130 and g < 140 and b < 170:
            return True

    # 6. Pill Banner
    if 310 <= x <= 720 and 228 <= y <= 264:
        # Inside banner
        if r < 190 or g > 90 or b > 100:
            return True

    return False

for y in range(h):
    for x in range(w):
        if not is_inside_artwork(x, y):
            continue
            
        r, g, b, a = pix[x, y]
        min_c = min(r, g, b)
        max_c = max(r, g, b)
        sat = max_c - min_c
        brightness = (r + g + b) / 3.0

        # Background inside artwork bounding box
        if brightness > 216 and sat < 24:
            is_robot_white = (x < 445 and 45 <= y <= 220 and (((x-350)**2 + (y-97)**2)**0.5 < 48 or ((x-262)**2 + (y-118)**2)**0.5 < 26 or ((x-355)**2 + (y-175)**2)**0.5 < 36))
            is_text_white = (395 <= x <= 735 and 90 <= y <= 225 and any(
                0 <= x+dx < w and 0 <= y+dy < h and pix[x+dx, y+dy][2] > 140 and pix[x+dx, y+dy][2] - pix[x+dx, y+dy][0] > 30
                for dx in range(-6, 7, 2) for dy in range(-6, 7, 2)
            ))
            is_banner_text = (330 <= x <= 700 and 232 <= y <= 260)
            
            if not (is_robot_white or is_text_white or is_banner_text):
                continue

        rpix[x, y] = (r, g, b, 255)

bbox = res.getbbox()
print('Refined artwork bbox:', bbox)
cropped = res.crop(bbox)
cropped.save(out_path, 'PNG')
print(f'Saved clean transparent logo to {out_path}, size: {cropped.size}')
