# 🌊 ZenFlow

**Organize Life. Find Flow.**

A beautiful, comprehensive life management system with dual themes (Soft & Noir), built with React and Tailwind CSS.

## ✨ Features

- 📊 **Projects & Task Management** - Organize your work and life projects
- 🎯 **Goals & Habit Tracking** - Set and achieve your goals with daily habits
- 💝 **Relationship Manager** - Keep track of important people in your life
- ⚖️ **Life Balance Wheel** - Visualize and improve life balance
- 📝 **Weekly Reviews** - Reflect and plan with guided prompts
- 💰 **Finance Tracker** - Monitor income, expenses, and savings
- 📌 **Notes & Someday/Maybe** - Capture ideas and future plans
- 🎨 **Beautiful Themes** - Toggle between Soft (warm beige) and Noir (dark) modes

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🎨 Customization

To rebrand this app, edit `/config/branding.ts`:

```typescript
export const BRANDING = {
  appName: 'Your App Name',
  tagline: 'Your Tagline',
  supportEmail: 'you@example.com',
  // ... etc
};
```

All branding updates automatically throughout the app!

## 💾 Data Storage

All data is stored locally in your browser using localStorage. Features include:

- ✅ Auto-save (saves every change automatically)
- 📤 Export data (download as JSON)
- 📥 Import data (restore from JSON backup)
- 🔐 Optional license key system

## 🎯 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 📦 Deployment

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Just connect your GitHub repo and deploy!

## 📄 License

This is a commercial product. See license terms at purchase.

## 💬 Support

Questions? Email: zenflow@lumiereatelier.studio

---

Made with 🤍 by Lumiere Atelier Studio
