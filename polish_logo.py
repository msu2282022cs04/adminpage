import os
from PIL import Image

src_path = r'c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png'
out_path = r'c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png'

img = Image.open(src_path).convert('RGBA')
w, h = img.size
pix = img.load()

res = Image.new('RGBA', (w, h), (0, 0, 0, 0))
rpix = res.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        if a == 0:
            continue
            
        # 1. Clean top-left area above robot hand
        # Hand is around (37, 102)
        if x < 70 and y < 65:
            dist_hand = ((x - 37)**2 + (y - 102)**2)**0.5
            if dist_hand >= 28:
                continue

        # 2. Clean top-right bunting area above leaf and palm trees
        # Temple peak is at x: 260 to 330, y: 0 to 45
        if y < 45:
            if x < 260 or x > 335:
                # Leaf starts around y=45 at x: 380 to 490
                # If green leaf tip exists at x: 420 to 470, only keep if strong green
                if not (410 <= x <= 480 and g > 110 and g - r > 20):
                    continue

        # 3. Clean area between robot head and temple peak: x in [170, 260], y in [0, 45]
        if 170 <= x <= 260 and y < 45:
            continue

        # 4. Clean bottom right shadow below leaf / outside banner
        if x > 430 and y > 215:
            brightness = (r + g + b) / 3.0
            sat = max(r, g, b) - min(r, g, b)
            if brightness > 190 and sat < 25:
                continue

        # 5. Clean bottom left shadow below robot cape
        if x < 85 and y > 215:
            brightness = (r + g + b) / 3.0
            sat = max(r, g, b) - min(r, g, b)
            if brightness > 190 and sat < 25:
                continue

        rpix[x, y] = (r, g, b, a)

bbox = res.getbbox()
print('Final pristine bbox:', bbox)
cropped = res.crop(bbox)
cropped.save(out_path, 'PNG')
print(f'Saved pristine transparent logo to {out_path}, size: {cropped.size}')
