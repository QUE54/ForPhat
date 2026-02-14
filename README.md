# 💜 Valentine's Day Universe - For Phat

A premium, cinematic, ultra-romantic Valentine's Day experience built exclusively for Phat.

## ✨ Features

- **3D Galaxy Scene** - Immersive Three.js powered universe background
- **Lock Screen** - Private access with relationship date password
- **Interactive Timeline** - Automatically calculates days together
- **Memory Galaxy** - Photo gallery with floating star interactions
- **Personal Letter** - Heartfelt message with elegant typography
- **Love Game** - Heart-catching mini-game with particle effects
- **PWA Support** - Installable, works offline
- **Mobile-First** - Fully responsive on all devices
- **60fps Animations** - Smooth, cinematic transitions

## 🚀 Quick Start

1. Open `index.html` in a modern web browser
2. Enter the password: `06/06/2024`
3. Experience the journey!

## 🎨 Customization Guide

### Adding Your Own Photos

**Method 1: Replace Placeholder Images**

Open `gallery.js` and modify the `setupMemories()` method:

```javascript
setupMemories() {
    this.memories = [
        {
            image: 'path/to/your/photo1.jpg',
            caption: 'Your custom caption here'
        },
        {
            image: 'path/to/your/photo2.jpg',
            caption: 'Another beautiful moment'
        },
        // Add more memories...
    ];
}
```

**Method 2: Use Base64 Images**

Convert your images to base64 and embed them directly:

```javascript
{
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
    caption: 'Your caption'
}
```

### Customizing the Letter

Edit the letter content in `index.html`:

```html
<div id="letter-text" class="letter-body">
    <p>Your first paragraph...</p>
    <p>Your second paragraph...</p>
    <!-- Add more paragraphs -->
</div>
```

### Adding Timeline Milestones

Use the `addMilestone()` method in `timeline.js`:

```javascript
timelineManager.addMilestone(
    '2024-07-15',
    'First Trip Together',
    'The weekend we explored the mountains',
    'Every moment felt like an adventure with you'
);
```

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --violet: #8B5CF6;      /* Change to your preferred violet */
    --pink: #EC4899;        /* Change to your preferred pink */
    --sky: #38BDF8;         /* Change to your preferred blue */
}
```

### Customizing Names & Dates

**In `index.html`:**
- Change "For Phat" to your partner's name
- Change "From Q" to your name

**In `timeline.js`:**
```javascript
this.relationshipStart = new Date('2024-06-06'); // Your date
```

**In `main.js`:**
```javascript
const correctPassword = '06/06/2024'; // Your date in MM/DD/YYYY
```

### Adjusting Game Difficulty

In `game.js`:

```javascript
this.targetScore = 50;  // Change target hearts to catch
```

In the game spawn rate:

```javascript
}, 800);  // Change interval (milliseconds)
```

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Open the website
2. Click the install icon in the address bar
3. Or: Menu → Install app

### Mobile (iOS)
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"

### Mobile (Android)
1. Open in Chrome
2. Tap Menu (⋮)
3. Select "Install app" or "Add to Home Screen"

## 🎵 Adding Background Music (Optional)

1. Add an audio file to your directory
2. In `index.html`, add before closing `</body>`:

```html
<audio id="bg-music" loop>
    <source src="path/to/your-music.mp3" type="audio/mpeg">
</audio>

<script>
    const music = document.getElementById('bg-music');
    music.volume = 0.3; // 30% volume
    
    // Auto-play after user interaction
    document.addEventListener('click', () => {
        music.play().catch(e => console.log('Autoplay prevented'));
    }, { once: true });
</script>
```

## 🎯 Tips for Best Experience

1. **Use high-quality images** (1200px+ width recommended)
2. **Optimize photos** before adding (use TinyPNG or similar)
3. **Test on mobile** to ensure responsive behavior
4. **Keep letter concise** for better reading experience
5. **Test offline** after installing as PWA

## 🛠️ Technical Details

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

### Performance
- Uses `requestAnimationFrame` for smooth 60fps
- Lazy loading for images
- Optimized particle systems
- Hardware-accelerated CSS animations

### File Structure
```
valentine-universe/
├── index.html              # Main HTML structure
├── styles.css              # Premium styling
├── main.js                 # App controller
├── threeScene.js          # 3D galaxy scene
├── timeline.js            # Timeline chapter
├── gallery.js             # Memory gallery
├── letter.js              # Letter scene
├── game.js                # Mini game
├── service-worker.js      # PWA offline support
├── manifest.json          # PWA configuration
└── README.md              # This file
```

## 🎨 Design Philosophy

This experience was designed with:
- **Luxury** - Premium glassmorphism and elegant typography
- **Emotion** - Soft colors, smooth animations, intimate moments
- **Uniqueness** - Built for one person, not a template
- **Cinematic** - Movie-like transitions and flow
- **Performance** - Optimized for smooth 60fps experience

## 💝 Customization Ideas

1. **Add voice messages** - Record and embed audio clips
2. **Create video memories** - Add video galleries
3. **Interactive quiz** - "How well do you know us?"
4. **Countdown timer** - Days until next anniversary
5. **Shared playlist** - Embed Spotify playlists
6. **Inside jokes section** - Special moments only you two know
7. **Future dreams** - Vision board of plans together

## 🐛 Troubleshooting

**Issue: Password not working**
- Make sure format is exactly `MM/DD/YYYY`
- Check date in `main.js` matches your relationship start

**Issue: Images not showing**
- Check file paths are correct
- Ensure images are in same directory or use absolute URLs
- Try converting to base64 for embedding

**Issue: 3D scene not rendering**
- Ensure Three.js CDN is accessible
- Check browser console for errors
- Try on different browser

**Issue: PWA not installing**
- Ensure all files are served over HTTPS (or localhost)
- Check manifest.json is valid
- Clear browser cache and retry

## 📄 License

This is a personal project created with love. Feel free to customize and make it your own!

## 💌 Final Note

This universe was created for one person in billions. Every star, every particle, every word - all designed to celebrate your unique love story.

Happy Valentine's Day, Phat! 💜✨

---

**Made with love by Q**
**Date: Valentine's Day 2026**
