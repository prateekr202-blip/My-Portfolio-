# Prateek Rai · Portfolio

A bold, expressive personal portfolio website built with React + Vite.

## ✨ Features
- Custom animated cursor
- Animated hero with floating photo card + rotating gradient ring
- Animated skill bars triggered on scroll
- Project cards with glow hover effects
- Alternating timeline with scroll-reveal
- Contact cards
- Fully responsive (mobile-friendly)
- Google Fonts: Syne + Space Mono + DM Sans

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## 📁 File Structure
```
portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx        ← All components
    ├── App.css        ← All styles
    └── index.css
```

---

## 🖼️ Adding Your Photo
1. Drop your photo (e.g. `photo.jpg`) into `src/assets/`
2. In `App.jsx`, replace the `photo-placeholder` div with:
```jsx
import myPhoto from './assets/photo.jpg';
// ...
<img src={myPhoto} alt="Prateek Rai" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'30px' }} />
```

## 🔗 Updating Social Links
In `App.jsx`, find the Contact section and update `href` values for GitHub and LinkedIn when ready.
