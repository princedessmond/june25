# Banner Images Guide

## Overview
This folder contains banner images for the hero carousel on the homepage. The carousel displays 4 rotating banners showcasing different aspects of the June 25th peaceful protest.

## Image Specifications

### Required Images
Place 4 banner images in this folder with the following names:
- `banner1.jpg` - Main protest announcement
- `banner2.jpg` - Rights & legal information
- `banner3.jpg` - Transportation support
- `banner4.jpg` - Legal aid services

### Technical Specifications
- **Format**: JPG, PNG, or WebP
- **Dimensions**: 1920 x 600 pixels (recommended)
- **Aspect Ratio**: 16:5 or 3:1
- **File Size**: Under 500KB each (optimize for web)
- **Color Space**: RGB

### Image Content Suggestions

#### Banner 1: Stand Together for Change
- Show peaceful protesters with Kenyan flags
- Include text overlay: "Stand Together for Change"
- Colors: Green, red, gold (Kenya flag colors)
- Mood: Unity, hope, peaceful determination

#### Banner 2: Your Voice Matters
- Constitutional rights theme
- Show people exercising peaceful assembly
- Include text: "Article 37 - Your Constitutional Right"
- Mood: Empowerment, legal rights

#### Banner 3: Free Transport Available
- Buses or transportation theme
- Map showing routes from different regions
- Include text: "Free Transport from Kisumu, Mombasa, Eldoret, Meru"
- Mood: Accessibility, inclusivity

#### Banner 4: Legal Aid 24/7
- Legal support theme
- Lawyers or justice imagery
- Include hotline number: 0800 JUSTICE
- Mood: Safety, professional support

## How to Add Images

### Option 1: Replace Placeholder Images
1. Create or source your banner images
2. Resize them to 1920 x 600 pixels
3. Optimize for web (compress to reduce file size)
4. Name them: `banner1.jpg`, `banner2.jpg`, `banner3.jpg`, `banner4.jpg`
5. Place them in this `/images/` folder

### Option 2: Use a Different Format
If using PNG or WebP instead of JPG:
1. Update the file paths in `index.html`
2. Change `banner1.jpg` to `banner1.png` (or `.webp`)
3. Do this for all 4 banner references

### Option 3: Use Online Images (Temporary)
For testing, you can use placeholder services:
1. Update the URLs in `index.html` to use services like:
   - Unsplash: `https://source.unsplash.com/1920x600/?protest,kenya`
   - Picsum: `https://picsum.photos/1920/600`

**Example in index.html:**
```html
<div class="hero-banner-image" style="background-image: url('https://source.unsplash.com/1920x600/?kenya,protest');">
```

## Design Tips

### Color Palette (Kenya Theme)
- **Primary Green**: #1e7e34
- **Red**: #d32f2f
- **Gold**: #ffd700
- **Black**: #000000
- **White**: #ffffff

### Text Overlays
- Use bold, readable fonts
- Add semi-transparent dark overlay for text readability
- Keep text concise and impactful
- Ensure high contrast between text and background

### Image Sources

#### Free Stock Photos (Protest/Unity Themes)
- Unsplash: https://unsplash.com/s/photos/peaceful-protest
- Pexels: https://www.pexels.com/search/protest/
- Pixabay: https://pixabay.com/images/search/demonstration/

#### Design Tools (Create Custom Banners)
- Canva: https://www.canva.com (Free templates available)
- Figma: https://www.figma.com (Free design tool)
- GIMP: https://www.gimp.org (Free Photoshop alternative)
- Photopea: https://www.photopea.com (Online Photoshop)

## Fallback Behavior

If no images are added, the carousel will display gradient backgrounds (green to dark green) as defined in the CSS. The content will still be fully readable and functional.

## Optimization

Before uploading images, optimize them:

### Online Tools
- TinyPNG: https://tinypng.com
- ImageOptim: https://imageoptim.com
- Squoosh: https://squoosh.app

### Command Line (if installed)
```bash
# Using ImageMagick
convert banner1.jpg -resize 1920x600^ -quality 85 banner1_optimized.jpg

# Using ffmpeg
ffmpeg -i banner1.jpg -vf scale=1920:600 -q:v 3 banner1_optimized.jpg
```

## Accessibility

- Ensure images have good contrast
- Don't rely solely on color to convey information
- Text should be readable at all screen sizes
- Consider adding alt text (update in HTML)

## Legal Considerations

- Only use images you have rights to
- For protest photos, ensure you have permission
- Respect people's privacy - avoid identifiable faces without consent
- Credit photographers if required by license

---

**Current Status**: The website will work without images using gradient backgrounds. Add images when ready to enhance visual appeal.
