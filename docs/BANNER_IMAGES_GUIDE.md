# 📸 How to Add Your Own Banner Images

Your hero carousel currently uses placeholder images from Unsplash. Here's how to add your own Kenyan Gen Z protest banners.

---

## 🎯 Quick Steps:

### Option 1: Use Local Images (Recommended for Custom Banners)

1. **Create images folder** (if it doesn't exist):
   ```bash
   mkdir images
   ```

2. **Add your banner images** to the `images/` folder:
   - `banner1.jpg` - Stand Together for Change
   - `banner2.jpg` - Your Voice Matters
   - `banner3.jpg` - Free Transport Available
   - `banner4.jpg` - Legal Aid 24/7

3. **Update `index.html`** - Change the background-image URLs:

```html
<!-- Slide 1 -->
<div class="hero-banner-image" style="background-image: url('images/banner1.jpg');">

<!-- Slide 2 -->
<div class="hero-banner-image" style="background-image: url('images/banner2.jpg');">

<!-- Slide 3 -->
<div class="hero-banner-image" style="background-image: url('images/banner3.jpg');">

<!-- Slide 4 -->
<div class="hero-banner-image" style="background-image: url('images/banner4.jpg');">
```

4. **Commit and push**:
   ```bash
   git add images/
   git add index.html
   git commit -m "Add custom protest banner images"
   git push
   ```

---

## 📐 Image Specifications:

**Recommended Size:**
- **Width**: 1920px (minimum 1200px)
- **Height**: 600-800px
- **Format**: JPG or PNG
- **File size**: < 500KB each (optimize for web)

**Content Tips:**
- Gen Z peaceful protesters
- Kenyan flags
- Protest signs with messages
- Crowd shots showing unity
- Young people marching peacefully
- Banners urging for change

---

## 🎨 Banner Theme Ideas:

### Banner 1: Unity & Solidarity
- Large crowd of young protesters
- Kenyan flags prominent
- Peaceful atmosphere
- Message: "Stand Together for Change"

### Banner 2: Rights & Justice
- Protesters holding signs
- "Article 37" or rights-based messages
- Determined faces
- Message: "Your Voice Matters"

### Banner 3: Community & Support
- People helping each other
- Buses or transport visible
- Collective action
- Message: "Free Transport Available"

### Banner 4: Legal Protection
- Lawyers with protesters
- Justice/legal imagery
- Safety focus
- Message: "Legal Aid 24/7"

---

## 🖼️ Option 2: Use Image URLs (Online Hosting)

If your images are hosted online (e.g., Imgur, Google Drive public links, etc.):

```html
<div class="hero-banner-image" style="background-image: url('https://your-image-url.com/banner1.jpg');">
```

**Recommended FREE Image Hosts:**
- **Imgur**: https://imgur.com (unlimited, direct links)
- **GitHub**: Store in your repo's `images/` folder
- **Cloudinary**: Free tier available

---

## ⚡ Quick Replace Script:

Run this to quickly update all banner references:

```bash
# In your project folder
cd /Users/georgemwita/Documents/Projects/june25

# Find and replace Unsplash URLs with local paths
sed -i '' 's|https://images.unsplash.com/photo-[^?]*?w=1920&q=80|images/banner1.jpg|g' index.html
```

---

## 🎭 Current Banners (Unsplash Placeholders):

The site currently uses these stock protest images:
1. **Slide 1**: Young peaceful protesters with signs
2. **Slide 2**: Crowd with raised fists
3. **Slide 3**: Activists marching peacefully
4. **Slide 4**: Protesters holding banners

**To keep Kenyan authenticity**, replace with actual Gen Z Kenya protest photos!

---

## 📸 Where to Get Kenya Protest Images:

### Free Stock (Creative Commons):
- **Unsplash**: https://unsplash.com/s/photos/kenya-protest
- **Pexels**: https://pexels.com/search/protest/
- **Wikimedia Commons**: https://commons.wikimedia.org

### Kenya-Specific:
- Search: "Gen Z Kenya protests 2024"
- Social media (with permission)
- Photographer collaborations
- Community submitted photos

**IMPORTANT**: Ensure you have rights/permission to use images!

---

## 🎨 Image Optimization:

Before uploading, optimize your images:

### Online Tools (Free):
1. **TinyPNG**: https://tinypng.com (compress JPG/PNG)
2. **Squoosh**: https://squoosh.app (advanced compression)
3. **ImageOptim** (Mac app)

### Command Line:
```bash
# Install ImageMagick
brew install imagemagick

# Optimize all banner images
for img in images/banner*.jpg; do
  convert "$img" -quality 85 -resize 1920x "$img"
done
```

---

## ✅ Testing Your Banners:

After adding images:

1. **Local Test**:
   ```bash
   open index.html
   ```

2. **Check**:
   - ✅ Images load properly
   - ✅ Text is readable over images
   - ✅ Carousel transitions smoothly
   - ✅ Mobile responsive

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Add Kenya protest banner images"
   git push
   ```

4. **Live Test**: Visit https://june25-protest.netlify.app in 60 seconds

---

## 🚨 Troubleshooting:

### Images not showing?
- Check file paths are correct (`images/banner1.jpg`)
- Ensure images folder is in same directory as `index.html`
- Verify images are added to Git: `git status`

### Images too large/slow?
- Compress to < 500KB each
- Use JPG format (not PNG for photos)
- Resize to 1920px width max

### Text not readable?
- The CSS already has dark overlay for readability
- If still unclear, increase overlay opacity in `styles.css`:
  ```css
  background: linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.55) 100%);
  ```

---

## 📝 Current HTML Structure:

Your hero carousel is in `index.html` around **line 47-112**.

Each slide looks like this:
```html
<div class="hero-slide">
    <div class="hero-overlay"></div>
    <div class="hero-banner-image" style="background-image: url('YOUR_IMAGE_HERE');">
        <div class="hero-gradient"></div>
    </div>
    <div class="container hero-content">
        <h2 class="hero-title">Your Title</h2>
        <p class="hero-subtitle">Your Subtitle</p>
        <div class="hero-cta">
            <a href="#register" class="btn btn-hero-primary">Button 1</a>
            <a href="#about" class="btn btn-hero-secondary">Button 2</a>
        </div>
    </div>
</div>
```

Just change `YOUR_IMAGE_HERE` to your image path!

---

## 🎉 Ready to Go!

Once you add your images, your hero section will showcase authentic Kenyan Gen Z peaceful protest imagery, making the site more impactful and relatable! 🇰🇪

**Need help? Check the responsive design in `RESPONSIVE_CHECKLIST.md`**
