# PWA Setup Guide for MatchAdda

## ✅ What's Been Added

Your MatchAdda website is now a **Progressive Web App (PWA)**! Here's what was configured:

### 1. **manifest.json** ✓
- App metadata and branding
- Custom icons and shortcuts
- App display mode (standalone - runs like native app)
- Theme colors (#ff7a18 orange)
- Shortcuts to Schedule, Points Table, and Teams pages

### 2. **service-worker.js** ✓
- Offline functionality via intelligent caching
- Cache versioning (matchadda-v1)
- Automatic cache updates
- Network-first strategy for resources
- Background sync support

### 3. **PWA Meta Tags** ✓ (Added to all 9 HTML files)
- `manifest.json` link
- Apple iOS app capabilities
- Theme color branding
- Apple touch icons
- Status bar styling

### 4. **Service Worker Registration** ✓
- Added to main.js
- Auto-registers on page load
- Checks for updates every 60 seconds
- Ready for custom install button

---

## 🚀 How to Test the PWA

### On **Desktop** (Chrome/Edge/Brave):
1. Open your site in browser
2. Click the **+** icon in address bar → "Install MatchAdda"
3. App runs in standalone window!

### On **Mobile** (iOS/Android):
1. **Android**: Open in Chrome → Menu (⋮) → "Install app" or "Add to home screen"
2. **iOS**: Open in Safari → Share (↗️) → "Add to Home Screen"

### Test **Offline Mode**:
1. Install the app (or test in DevTools)
2. Disconnect internet / Go offline
3. All cached pages still work!

---

## 📋 PWA Checklist

- ✅ manifest.json configured
- ✅ service-worker.js for offline support
- ✅ HTTPS ready (deploy on GitHub Pages/Netlify/Vercel for HTTPS)
- ✅ Responsive design (already have viewport meta tag)
- ✅ App icons and branding
- ✅ Installable on all major platforms

---

## 🔧 Deployment Notes

### **For GitHub Pages (HTTPS Enabled)**:
PWA works out of the box once deployed!

### **For Local Testing**:
Use a local HTTPS server:
```bash
# Using Python 3
python -m http.server --directory . 8000

# Or using Node.js (http-server)
npx http-server -p 8000
```

### **For Vercel/Netlify**:
Just push your code - HTTPS is automatic!

---

## 🎨 Customization

### **Change App Name**:
Edit in **manifest.json**:
```json
"name": "Your App Name",
"short_name": "Your Short Name"
```

### **Change Theme Color**:
Edit these files:
1. **manifest.json**: `"theme_color": "#yourcolor"`
2. **All HTML files**: `<meta name="theme-color" content="#yourcolor">`

### **Add Custom Icon**:
Replace the SVG data URI in manifest.json with your icon file:
```json
"icons": [{"src": "path/to/icon.png", "sizes": "192x192", "type": "image/png"}]
```

### **Enable Install Button** (Optional):
Uncomment the code at the end of main.js and add a button:
```html
<button id="install-button">Install App</button>
```

---

## 📱 Features Available

✅ Install as app on home screen  
✅ Works offline (cached content)  
✅ Push notifications support (ready)  
✅ App shortcuts in menu  
✅ Share target support (configured)  
✅ Background sync (configured)  

---

## 🐛 Testing PWA Features

### In Chrome DevTools:
1. F12 → Application tab
2. **Manifest**: Check if manifest loaded correctly
3. **Service Workers**: See registration status
4. **Storage**: View cached files
5. **Offline**: Simulate offline to test caching

### LightHouse Audit:
1. F12 → Lighthouse
2. Run PWA audit
3. Fix any issues for 100% score

---

## 📝 File Changes Summary

| File | Changes |
|------|---------|
| manifest.json | **NEW** - App metadata |
| service-worker.js | **NEW** - Offline & caching |
| index.html | ✏️ Added PWA meta tags |
| schedule.html | ✏️ Added PWA meta tags |
| teams.html | ✏️ Added PWA meta tags |
| points-table.html | ✏️ Added PWA meta tags |
| guides.html | ✏️ Added PWA meta tags |
| about.html | ✏️ Added PWA meta tags |
| faq.html | ✏️ Added PWA meta tags |
| legal.html | ✏️ Added PWA meta tags |
| maintenance.html | ✏️ Added PWA meta tags |
| main.js | ✏️ Added SW registration |

---

## 🎯 Next Steps

1. **Deploy to HTTPS** (GitHub Pages, Vercel, or Netlify)
2. **Test on mobile** (Android Chrome or iOS Safari)
3. **Install the app** and verify it works offline
4. **Monitor** service worker in DevTools

---

**Questions?** Check [Google's PWA Guide](https://web.dev/progressive-web-apps/) or [MDN PWA Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

Your MatchAdda app is ready to be installed! 🚀🏏
