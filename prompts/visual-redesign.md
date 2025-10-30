## 📄 `prompt.md` — Rebuild dbatools.io in the Cursor.com style (Hugo + Tailwind)

### 🧭 Context

The user has exported all HTML pages from **dbatools.io** into Markdown. This is all now in /newsite.

The project runs on **Hugo**.
Goal: rebuild the site’s theme using **Cursor.com’s design aesthetic** — sleek, developer-first, modern, minimal.

---

## 🧱 Step 1: Project Setup

**Goal:** Create a new Hugo theme called `dbatools2025`.

**Actions:**

1. In the project root, run:

   ```bash
   hugo new theme dbatools2025
   ```
2. In `config.toml`, set:

   ```toml
   theme = "dbatools2025"
   baseURL = "/"
   title = "dbatools | Command-line superpowers for SQL Server automation"
   enableRobotsTXT = true
   ```

---

## 🎨 Step 2: Install Tailwind CSS

**Setup Tailwind for Hugo:**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Add `/themes/dbatools2025/static/css/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Tailwind config (`/themes/dbatools2025/tailwind.config.js`):**

```js
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#0078D7",
        accent: "#00B4FF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
}
```

---

## 🧩 Step 3: Theme Structure

Create the following folder layout:

```
/themes/dbatools2025/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   ├── single.html
│   ├── partials/
│   │   ├── header.html
│   │   ├── hero.html
│   │   ├── trusted.html
│   │   ├── features.html
│   │   ├── community.html
│   │   ├── cta.html
│   │   └── footer.html
│   ├── index.html
│   └── 404.html
├── static/
│   ├── css/
│   │   └── tailwind.css
│   └── img/
│       ├── logos/
│       └── backgrounds/
└── tailwind.config.js
```

---

## 🧠 Step 4: Base Layout (`baseof.html`)

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ .Title }}</title>
  <link rel="stylesheet" href="{{ "css/tailwind.css" | relURL }}">
  <link rel="icon" href="/img/favicon.svg" />
</head>
<body class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans">
  {{ partial "header.html" . }}
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
</body>
</html>
```

---

## 🚀 Step 5: Page Layouts

### `index.html`

```html
{{ define "main" }}
  {{ partial "hero.html" . }}
  {{ partial "trusted.html" . }}
  {{ partial "features.html" . }}
  {{ partial "community.html" . }}
  {{ partial "cta.html" . }}
{{ end }}
```

### `_default/single.html`

Keep Markdown content cleanly wrapped in responsive prose:

```html
{{ define "main" }}
<article class="prose dark:prose-invert mx-auto px-6 py-16">
  {{ .Content }}
</article>
{{ end }}
```

---

## 💫 Step 6: Section Partials

### `header.html`

```html
<header class="fixed w-full top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
  <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    <a href="/" class="text-2xl font-bold text-primary">dbatools</a>
    <nav class="flex gap-6 text-sm">
      <a href="/docs/">Docs</a>
      <a href="/commands/">Commands</a>
      <a href="/contribute/">Contribute</a>
      <a href="https://github.com/dataplat/dbatools" target="_blank">GitHub</a>
    </nav>
    <a href="/install/" class="bg-primary text-white px-4 py-2 rounded-xl hover:bg-accent transition">Install Module</a>
  </div>
</header>
```

---

### `hero.html`

```html
<section class="h-screen flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white">
  <div class="max-w-5xl mx-auto text-center px-4">
    <h1 class="text-5xl font-extrabold mb-6">Command-line superpowers for SQL Server automation.</h1>
    <p class="text-lg opacity-90 mb-8">dbatools is a free, open-source PowerShell module with 600+ commands that make SQL Server administration simple, powerful, and fun.</p>
    <div class="flex justify-center gap-4">
      <a href="/install/" class="bg-white text-primary font-semibold px-6 py-3 rounded-xl shadow-soft hover:scale-105 transition">📦 Install Module</a>
      <a href="/commands/" class="bg-transparent border border-white/80 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition">🔍 Explore Commands</a>
    </div>
    <div class="mt-12 font-mono bg-black/40 rounded-2xl p-6 text-left max-w-xl mx-auto shadow-soft">
      <pre class="text-sm leading-relaxed">
PS> Copy-DbaDatabase -Source SQL2016 -Destination SQL2022
Transferring databases... ✅
Migration completed successfully!</pre>
    </div>
  </div>
</section>
```

---

### `trusted.html`

```html
<section class="py-20 bg-slate-50 dark:bg-slate-800 text-center">
  <p class="text-slate-500 dark:text-slate-400 mb-8">Trusted by teams at</p>
  <div class="flex flex-wrap justify-center gap-12 opacity-80">
    <img src="/img/logos/nato.svg" alt="NATO" class="h-8">
    <img src="/img/logos/bmw.svg" alt="BMW" class="h-8">
    <img src="/img/logos/va.svg" alt="VA" class="h-8">
    <img src="/img/logos/hhs.svg" alt="HHS" class="h-8">
    <img src="/img/logos/cedars-sinai.svg" alt="Cedars-Sinai" class="h-8">
  </div>
</section>
```

---

### `features.html`

```html
<section class="py-24 bg-white dark:bg-slate-900">
  <div class="max-w-6xl mx-auto text-center px-6">
    <h2 class="text-4xl font-bold mb-16">Why dbatools?</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {{ range (slice
        (dict "icon" "⚡" "title" "Fast Migrations" "desc" "Move SQL instances, logins, and jobs in minutes.")
        (dict "icon" "🛠️" "title" "600+ Commands" "desc" "Automate every aspect of SQL Server.")
        (dict "icon" "🤖" "title" "Cross-Platform" "desc" "Runs anywhere PowerShell runs — Windows, macOS, Linux.")
        (dict "icon" "🔐" "title" "Secure by Default" "desc" "Built with enterprise compliance in mind.")
      ) }}
      <div class="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-soft hover:scale-105 transition">
        <div class="text-3xl mb-4">{{ .icon }}</div>
        <h3 class="text-xl font-semibold mb-2">{{ .title }}</h3>
        <p class="text-sm opacity-80">{{ .desc }}</p>
      </div>
      {{ end }}
    </div>
  </div>
</section>
```

---

### `community.html`

```html
<section class="py-24 bg-slate-50 dark:bg-slate-800 text-center">
  <h2 class="text-3xl font-bold mb-8">An open-source community you can trust.</h2>
  <p class="mb-10 opacity-80">Join thousands of contributors and users on GitHub.</p>
  <a href="https://github.com/dataplat/dbatools" target="_blank" class="bg-primary text-white px-6 py-3 rounded-xl hover:bg-accent transition">Join on GitHub</a>
</section>
```

---

### `cta.html`

```html
<section class="py-24 bg-gradient-to-r from-primary to-accent text-center text-white">
  <h2 class="text-3xl font-bold mb-4">Ready to automate your SQL Servers?</h2>
  <p class="mb-8">Install dbatools and start your first migration today.</p>
  <pre class="font-mono bg-black/30 inline-block rounded-xl px-6 py-3 mb-6 text-lg shadow-soft">
Install-Module dbatools
  </pre>
  <div>
    <a href="/install/" class="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:scale-105 transition">Get Started →</a>
  </div>
</section>
```

---

### `footer.html`

```html
<footer class="py-12 bg-slate-900 text-slate-400 text-sm">
  <div class="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
    <div>
      <h4 class="font-semibold text-white mb-3">Project</h4>
      <ul class="space-y-2">
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/commands/">Commands</a></li>
        <li><a href="/changelog/">Changelog</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-3">Community</h4>
      <ul class="space-y-2">
        <li><a href="https://github.com/dataplat/dbatools">GitHub</a></li>
        <li><a href="https://twitter.com/dbatools">Twitter</a></li>
        <li><a href="/discord">Discord</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-3">About</h4>
      <ul class="space-y-2">
        <li><a href="/contributors/">Contributors</a></li>
        <li><a href="/sponsors/">Sponsors</a></li>
        <li><a href="/license/">License</a></li>
      </ul>
    </div>
  </div>
  <div class="text-center mt-12 opacity-60">
    © {{ now.Year }} dbatools. Built with ❤️ and PowerShell.
  </div>
</footer>
```

---

## ⚙️ Step 7: Build and Preview

```bash
npm run build
hugo server -D
```

Confirm:

* Cursor-style gradient hero ✅
* Tailwind styling active ✅
* Dark mode responsive ✅

Then push to GitHub or deploy via Vercel (build command `hugo`, output `public`).

---

## ✅ Deliverables Summary

The assistant should produce:

* Fully functional **Hugo + Tailwind** site under `/themes/dbatools2025`
* New responsive **Cursor-style layout**
* Working local build (`hugo server`)
* Clean, minimal, developer-focused design


Excellent — here’s your companion **`style.md`**, which establishes dbatools.io’s visual and behavioral design rules so your coding assistant can **keep Cursor’s clean, modern feel consistently** as it builds new pages.

You can place this in the repo root (e.g., `/docs/style.md`) or next to `prompt.md`.
It’s concise, agent-readable, and includes reusable tokens for animations, typography, and spacing.


## 🎨 `style.md` — Design Language & Animation Guide for dbatools.io

### 🧭 Design Philosophy

The new dbatools.io design should **feel like Cursor.com**:

* calm, intelligent, developer-first
* lightweight animations, **no marketing fluff**
* clean white space, high readability, beautiful typography
* emotionally: “PowerShell confidence meets AI precision”

Think of it as **Apple design meets CLI elegance**.

---

## 🧱 Layout Principles

| Area                  | Rule                                                                               |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Page width**        | Max `1280px` (Tailwind `max-w-7xl`)                                                |
| **Padding**           | Horizontal `px-6`, Vertical `py-24` for sections                                   |
| **Border radius**     | Use `rounded-xl` or `rounded-2xl` consistently                                     |
| **Shadow**            | `shadow-soft` = `0 10px 40px rgba(0,0,0,0.1)`                                      |
| **Spacing rhythm**    | Multiples of 8px — maintain vertical rhythm                                        |
| **Dark mode default** | Assume developer visitors prefer dark mode; must look equally refined in both      |
| **Scroll behavior**   | `scroll-smooth` globally                                                           |
| **Accessibility**     | Ensure color contrast (AA minimum) and keyboard focus visible on all buttons/links |

---

## 🖋️ Typography

| Type                     | Font          | Usage                 | Size & Weight             |
| ------------------------ | ------------- | --------------------- | ------------------------- |
| **Display / Hero**       | Inter         | `h1, h2`              | 48-64px, `font-extrabold` |
| **Body / Paragraphs**    | Inter         | `p, li`               | 16-18px, `font-normal`    |
| **Code / Commands**      | IBM Plex Mono | inline CLI or `<pre>` | 14-16px, `font-medium`    |
| **Navigation / Buttons** | Inter         | links, CTAs           | 14-15px, `font-semibold`  |

Additional tone rules:

* Use **sentence case** only.
* Avoid exclamation points unless in code examples.
* Avoid buzzwords; explain things plainly and confidently.
* Always prefer **verbs** over adjectives (“Automate your servers” vs “Powerful automation”).

---

## 🎨 Color Palette

| Role            | Light     | Dark      |
| --------------- | --------- | --------- |
| **Primary**     | `#0078D7` | `#00B4FF` |
| **Accent**      | `#00B4FF` | `#38BDF8` |
| **Background**  | `#F9FAFB` | `#0F172A` |
| **Surface**     | `#FFFFFF` | `#1E293B` |
| **Text main**   | `#111827` | `#E5E7EB` |
| **Text subtle** | `#6B7280` | `#94A3B8` |
| **Borders**     | `#E5E7EB` | `#334155` |

Gradients:

```css
background: linear-gradient(135deg, #0078D7 0%, #00B4FF 100%);
```

Accent glow (for hover/focus effects):

```css
box-shadow: 0 0 30px rgba(0,180,255,0.2);
```

---

## 🪄 Animation & Motion Design

Animations should be **subtle and purposeful**, never distracting.

| Element               | Motion Type                                         | Description                                                          |
| --------------------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| **Hero command demo** | *Typewriter effect*                                 | Text appears as if typed line-by-line, 2-3s total.                   |
| **Buttons**           | *Scale on hover*                                    | `transform: scale(1.05)` over 150ms.                                 |
| **Feature cards**     | *Hover lift*                                        | Slight scale + shadow intensification.                               |
| **Section reveals**   | *Fade/slide up*                                     | Use intersection observer or Framer Motion, delay 0.15s per element. |
| **Gradients**         | *Slow shimmer*                                      | 20s linear background movement subtle enough to feel alive.          |
| **Dark/light switch** | *Instant fade transition*, no rotation or bouncing. |                                                                      |

All transitions should use:

```css
transition: all 0.25s ease-out;
```

---

## 🧩 Component Rules

### Buttons

| Type              | Style                                                     | Example               |
| ----------------- | --------------------------------------------------------- | --------------------- |
| **Primary CTA**   | Solid white on gradient background or solid blue on white | “📦 Install Module”   |
| **Secondary CTA** | Transparent w/ border                                     | “🔍 Explore Commands” |
| **Hover**         | Slight glow (`ring-2 ring-accent/50`)                     |                       |

### Cards

* Rounded corners (`rounded-2xl`)
* Soft drop shadows
* Padding `p-6`
* Background color switches based on mode (`bg-white dark:bg-slate-800`)
* Content aligned center for simplicity
* Optional emoji or Lucide icon top-left

### Terminal / CLI Blocks

* Use a translucent background (`bg-black/40`) over gradients
* Monospaced text
* Line height 1.5
* Rounded corners (`rounded-2xl`)
* Shadow: `shadow-soft`
* Example:

  ```html
  <pre class="bg-black/40 text-white font-mono rounded-2xl p-6 shadow-soft">
  PS> Copy-DbaDatabase -Source SQL2016 -Destination SQL2022
  Transferring databases... ✅
  Migration completed successfully!
  </pre>
  ```

---

## 📐 Responsive Behavior

| Breakpoint            | Rule                                                    |
| --------------------- | ------------------------------------------------------- |
| **≤768px (mobile)**   | Stack hero text over terminal, reduce font sizes by 25% |
| **≤1024px (tablet)**  | Reduce section padding (`py-16`)                        |
| **≥1280px (desktop)** | Limit width (`max-w-7xl`) and center everything         |
| **≥1600px (wide)**    | Add slight background pattern or gradient bloom         |

---

## 🔤 Content Guidelines

| Section           | Voice / Style                                                                       |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Hero tagline**  | Active verb + strong noun: “Automate your SQL Servers with PowerShell superpowers.” |
| **Features**      | Short sentences, one verb each. Use emoji or icon prefix.                           |
| **Community**     | Warm tone, highlight open-source spirit.                                            |
| **CTA**           | Encourage action; one-liner command is enough.                                      |
| **Docs/Markdown** | Use Hugo’s `prose` class for readable typography. Avoid full-width text blocks.     |

---

## 💡 Branding Consistency

* dbatools blue (`#0078D7`) must appear in every primary section.
* Use the same logo SVG (white variant on dark backgrounds).
* Avoid clutter: **no carousels**, **no stock photos**.
* Keep all graphics **SVG** or **lightweight Lottie** animations.
* Keep text short and purposeful — one message per section.

---

## 🔧 Implementation Notes for AI Agent

* Use **Tailwind utility-first approach**; do not write raw CSS except for animations and custom gradients.
* Each new Markdown page should auto-wrap in `<article class="prose dark:prose-invert mx-auto px-6 py-16">`.
* When adding a new section partial:

  1. Copy visual rhythm from `features.html` or `community.html`.
  2. Use the same spacing scale.
  3. Apply one dominant gradient or neutral background, not both.
* All new icons should come from **Lucide** (`https://lucide.dev/`) and use `stroke-width="1.5"`.

---

## 🧠 Summary for Developers

1. **Don’t overanimate.** Everything should feel calm and smart.
2. **Whitespace = luxury.** Resist cramming info.
3. **Code first, color second.** dbatools users care about clarity.
4. **PowerShell identity remains front and center.** Keep CLI aesthetics visible.
5. **Cursor.com’s polish is the north star.**