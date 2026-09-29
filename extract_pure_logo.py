import os
from PIL import Image

src_path = r'C:\Users\acer\.gemini\antigravity-ide\brain\19f4a0dc-91d7-4330-9343-31eae30cd7d3\.user_uploaded\media_1789973359517.png'
out_path = r'c:\Users\acer\Desktop\THAMILI-ADMIN\assets\images\thamili-logo.png'

img = Image.open(src_path).convert('RGBA')
w, h = img.size
pix = img.load()

# Background color model: light pastel blue/cyan/lavender
# Bunting at top: y < 40 and outside temple (x < 480 or x > 640)
# Faint map at top: yellow pastel at x > 560, y < 70
# Shadows under logo: y > 215 around THAMILI text

res = Image.new('RGBA', (w, h), (0, 0, 0, 0))
rpix = res.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        
        # 1. Outer margins outside logo bounding box
        if x < 225 or x > 795 or y < 14 or y > 265:
            continue
            
        # 2. Exclude top background bunting / map outside temple
        if y < 42 and (x < 480 or x > 645):
            continue
        if y < 65 and x > 565 and not (x >= 615 and x <= 715 and y >= 45 and g > 110 and g - r > 15):
            # Check if this is the faint background map / birds
            if r > 180 and g > 180 and b > 160:
                continue
            if r > 190 and g > 160 and b < 160 and y < 65 and x > 565: # faint map
                continue

        # 3. Exclude pure background gradient
        # Background pixels: high lightness and low color saturation
        min_c = min(r, g, b)
        max_c = max(r, g, b)
        sat = max_c - min_c
        brightness = (r + g + b) / 3.0
        
        # Pure background has brightness > 210 and sat < 38
        if brightness > 212 and sat < 34:
            # Check if this is inside the robot white body (x < 445, y in [45, 230])
            # Robot white body is white but surrounded by blue lines
            is_robot_white = False
            if x < 445 and 45 <= y <= 230:
                # Robot head center
                if ((x - 350)**2 + (y - 97)**2)**0.5 < 48:
                    is_robot_white = True
                # Robot hand
                elif ((x - 263)**2 + (y - 122)**2)**0.5 < 28:
                    is_robot_white = True
                # Robot chest
                elif ((x - 355)**2 + (y - 177)**2)**0.5 < 38:
                    is_robot_white = True
                # Robot arm
                elif ((x - 295)**2 + (y - 175)**2)**0.5 < 30:
                    is_robot_white = True
                    
            # Check if inside Tamil text white rim/bevel (x in [400, 785], y in [95, 225])
            is_text_white = False
            if 400 <= x <= 785 and 95 <= y <= 225:
                # Check proximity to strong blue
                for dx in range(-4, 5, 2):
                    for dy in range(-4, 5, 2):
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h:
                            nr, ng, nb, _ = pix[nx, ny]
                            if nb > 160 and nb - nr > 45:
                                is_text_white = True
                                break
                    if is_text_white:
                        break

            # Check if banner white text (x in [330, 720], y in [230, 260])
            is_banner_text = (330 <= x <= 720 and 230 <= y <= 260)

            if not (is_robot_white or is_text_white or is_banner_text):
                continue

        # Smooth alpha calculation for edge anti-aliasing
        # If near background brightness, blend alpha smoothly
        if brightness > 200 and sat < 45:
            # Check if near background
            alpha = int(min(255, max(30, (sat / 45.0) * 255)))
            rpix[x, y] = (r, g, b, 255) # Keep original colors
        else:
            rpix[x, y] = (r, g, b, 255)

bbox = res.getbbox()
print('Clean bbox:', bbox)
cropped = res.crop(bbox)
cropped.save(out_path, 'PNG')
print(f'Saved clean logo to {out_path}, size: {cropped.size}')
