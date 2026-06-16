# Chirag Honnyal — Software Engineer & Competitive Programmer Portfolio

A premium, interactive, and fully responsive developer portfolio showcasing my journey as a **Software Engineer** and **Competitive Programmer**. Built with modern web technologies, smooth animations, and real-time API integrations.

🔗 **Live Link:** [https://chiraghonnyal-dev.vercel.app](https://chiraghonnyal-dev.vercel.app)

---

## ⚡ Core Features

*   **Keyboard-Navigable Command Palette (`Ctrl + K`)**: Fully accessible modal search bar with smooth scroll offset calculations, keyboard controls (`↑`/`↓` arrows, `Enter`, `Esc`), and a smart footer.
*   **Live Codeforces Submission Heatmap**: Fetches real-time submission data from the Codeforces API, displays daily contribution levels, and dynamically calculates active problem-solving streaks (current & longest).
*   **Live Local Time (IST)**: Displays local Indian Standard Time updating in real-time.
*   **Accordion Education & Projects Timeline**: Clean, expandable accordion panels featuring detailed bullet points and responsive technology tags.
*   **Tech Stack Grid**: Interactive hover-responsive skill cards powered by uniform `skillicons.dev` graphics and custom dark-themed `simpleicons.org` fallbacks.
*   **Verified Profile Badge & Tagline Slider**: Micro-animations cycling taglines between *Software Engineer* and *Competitive Programmer*.
*   **Responsive Dark/Light Mode Switcher**: Supports instant manual theme toggle with state persistence via `localStorage` (fully preventing flash-of-unstyled-content on load).

---

## 🛠️ Built With

*   **Core**: HTML5, Vanilla JavaScript (ES6+), Modern CSS3 (CSS Variables, Flexbox, CSS Grid)
*   **Icons**: [Skill Icons](https://skillicons.dev/), [Simple Icons](https://simpleicons.org/)
*   **APIs**: Codeforces User Status API
*   **Fonts**: Outfit (sans-serif), JetBrains Mono (monospace)

---

## 📂 Project Structure

```text
├── index.html          # Main HTML structure, metadata, & SVGs
├── style.css           # Modern CSS variables, typography scale, & layouts
├── script.js          # Core JS: Command palette, time, accordion, & Codeforces API
├── chirag.jpg          # Profile photo
├── cover-test.svg      # Custom isometric geometric artwork header
├── github.svg          # Social branding logo
├── linkedin.svg        # Social branding logo
└── fonts/              # Custom loaded local web fonts
```

---

## 💻 Local Development

To run and preview the website locally without any complex bundlers, you can spin up a simple HTTP server:

### Option A: Python (Recommended)
Run the following command in the project root:
```bash
python -m http.server 3000
```
Then open **[http://localhost:3000](http://localhost:3000)** in your web browser.

### Option B: Node.js (Live Server)
If you have Node.js installed, you can use `live-server` for hot reloading:
```bash
npx live-server
```

---

## 🚀 Easy Vercel Deployment

This project is deployed on **Vercel** and supports automatic deployment from GitHub.

To deploy it yourself:
1. Push this repository to your GitHub account.
2. Go to your **Vercel Dashboard** and click **Add New > Project**.
3. Import this repository.
4. Leave all build settings at their defaults and click **Deploy**. Vercel will automatically detect `index.html` at the root and serve your static site in seconds!

---

## 📬 Connect With Me

- **Portfolio:** [https://chiraghonnyal-dev.vercel.app](https://chiraghonnyal-dev.vercel.app)
- **GitHub:** [https://github.com/Chirag6722](https://github.com/Chirag6722)
- **LinkedIn:** [https://www.linkedin.com/in/chirag-honnyal/](https://www.linkedin.com/in/chirag-honnyal/)
