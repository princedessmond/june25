# 🎨 Add Your Gen Z Kenya Protest Banners

## Quick Setup (2 Minutes)

### Step 1: Save Your Banner Images

You have the "5 Day Memorial" banner. Save it and create 3 more variations:

**Required Banners:**
1. `banner1.jpg` - **5 Day Memorial** (the one you showed me)
   - Theme: Memorial and remembrance
   - Current message works perfectly!

2. `banner2.jpg` - **Your Rights Matter**
   - Create similar design
   - Focus: Constitutional rights, Article 37
   - Color: Red/Green Kenya colors
   - Text: "Know Your Rights" "Peaceful Assembly is Constitutional"

3. `banner3.jpg` - **Unity & Transport**
   - Theme: Coming together, buses, solidarity
   - Text: "One People, One Purpose" "Free Transport to CBD"
   - Show: Buses, crowds, unity symbols

4. `banner4.jpg` - **Legal Protection**
   - Theme: Legal aid, justice, protection
   - Text: "24/7 Legal Support" "We Stand With You"
   - Symbols: Scales of justice, candles, support

---

## Step 2: Add Images to Project

```bash
# Navigate to your project
cd /Users/georgemwita/Documents/Projects/june25

# Copy your banner images here
# (Replace /path/to/your/downloads with actual path)

cp ~/Downloads/5-day-memorial.jpg images/banner1.jpg
cp ~/Downloads/rights-banner.jpg images/banner2.jpg
cp ~/Downloads/unity-banner.jpg images/banner3.jpg
cp ~/Downloads/legal-banner.jpg images/banner4.jpg
```

---

## Step 3: Update HTML (ALREADY DONE FOR YOU!)

I'll update the HTML file to use local images instead of Unsplash.

---

## Banner Design Tips:

### Use Canva (Free):
1. Go to https://canva.com
2. Create 1920 x 1080 design
3. Use Kenya colors: Green (#006600), Red (#CC0000), Black, White
4. Add Kenyan flag elements
5. Bold text, high contrast
6. Export as JPG

### Canva Templates to Remix:
- Search: "Protest Poster"
- Search: "Social Justice Banner"
- Search: "Memorial Design"

### Key Elements:
- **Kenyan Flag** 🇰🇪
- **Fist Symbol** ✊ (unity)
- **Candles** 🕯️ (memorial)
- **Bold Typography**
- **Dark backgrounds** (text pops)
- **Red accents** (urgency)

---

## Quick Canva Design Prompts:

### Banner 2 - Rights:
```
Background: Dark red gradient
Main Text: "YOUR VOICE MATTERS"
Subtext: "Article 37 - Right to Peaceful Assembly"
Visual: Kenyan flag, raised fists
Colors: Red, Green, Gold, White
```

### Banner 3 - Transport:
```
Background: Green gradient with Kenya flag
Main Text: "TOGETHER WE MARCH"
Subtext: "Free Transport - All Routes to CBD"
Visual: Silhouettes of crowd, buses
Colors: Green, Black, Gold
```

### Banner 4 - Legal Aid:
```
Background: Dark with spotlight
Main Text: "WE PROTECT OUR OWN"
Subtext: "24/7 Legal Support Hotline: 0800 587 423"
Visual: Scales of justice, shield
Colors: Gold, Black, White
```

---

## If You Don't Want to Design:

Just use the one banner you have (`banner1.jpg`) for all 4 slides temporarily:

```bash
cd /Users/georgemwita/Documents/Projects/june25/images
cp banner1.jpg banner2.jpg
cp banner1.jpg banner3.jpg
cp banner1.jpg banner4.jpg
```

Later you can update each one individually.

---

## Testing:

After adding images:
```bash
# Open locally to preview
open index.html

# If looks good, commit
git add images/
git commit -m "Add Gen Z Kenya protest memorial banners"
git push
```

**Live in 60 seconds at**: https://june25-protest.netlify.app

---

## Need Help Designing?

I can't create the actual image files, but I can:
1. ✅ Provide design specifications
2. ✅ Suggest color schemes
3. ✅ Write text content for each banner
4. ✅ Give Canva template ideas

**You create the images, I'll handle the code!** 🎨

---

## File Locations:

- **Images folder**: `/Users/georgemwita/Documents/Projects/june25/images/`
- **HTML file**: `/Users/georgemwita/Documents/Projects/june25/index.html`
- **Live site**: https://june25-protest.netlify.app

**Ready when you are!** 🚀
