# Harry's Chicken – Official Website & Deployment Guide

> **Artisanal Slow-Simmered Chicken Soup, Golden Bone Broths & Catering**  
> Location: Samrala Chowk, LIG 156, SEC 22, near Green Land School Gate, Ludhiana, Punjab 141008  
> Contact: **086994 36000**

---

## 🚀 Netlify Deployment Guide (404 Error Fix)

### ❓ 404 Error Kyun Aa Raha Tha?
Netlify ek static host hai. Jab aap React/Vite SPA (Single Page Application) deploy karte hain, toh agar:
1. **`netlify.toml`** ya **`_redirects`** file na ho,
2. Ya user page refresh kare ya kisi direct section/link par jaye,  
toh Netlify server par wo file physically na milne ke kaaran **"404 Not Found"** show karta tha.

### ✅ Humne Kya Fix Kar Diya Hai:
1. **`netlify.toml`** file add kar di hai:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - SPA Redirect Rule: `/* -> /index.html (Status 200)`
2. **`public/_redirects`** file add kar di hai jo automatically `dist` folder mein copy hoti hai.
3. **`vite.config.ts`** mein `base: '/'` set kar diya hai taaki sabhi CSS/JS bundles root path se load hon.
4. **`public/favicon.svg`** add kar diya hai taaki favicon par bhi 404 na aaye.

---

## 📦 How to Push to GitHub & Deploy on Netlify

### Step 1: Code Ko GitHub Par Push Karein
Agar aapne abhi tak GitHub par repo nahi banaya hai:
1. GitHub par jakar **New Repository** banayein (e.g. `harrys-chicken-ludhiana`).
2. Apne terminal mein ye commands run karein:

```bash
# 1. Git initialize karein (agar pehle se nahi hai)
git init

# 2. Sabhi files stage karein
git add .

# 3. Commit karein
git commit -m "Feat: Complete Harry's Chicken website with Netlify 404 fix"

# 4. Main branch set karein
git branch -M main

# 5. Apna remote repo link add karein (apna username aur repo name daalein)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

# 6. GitHub par push karein
git push -u origin main
```

---

### Step 2: Netlify Par Deploy Karein (1-Click)
1. **[Netlify Dashboard](https://app.netlify.com/)** par login karein.
2. Click karein **"Add new site"** ➜ **"Import an existing project"**.
3. Select karein **GitHub** aur apna repository (`harrys-chicken-ludhiana`) chunein.
4. Netlify automatically hamari `netlify.toml` file ko read kar lega:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
5. Click karein **"Deploy site"**.
6. 1 minute ke andar aapki website live ho jayegi aur **kisi bhi page refresh par 404 error nahi aayega!**

---

## 🛠 Local Development Commands

```bash
# Dependencies install karein
npm install

# Local development server start karein (Port 3000)
npm run dev

# Production build generate karein (dist folder)
npm run build

# Production preview check karein
npm run preview
```
