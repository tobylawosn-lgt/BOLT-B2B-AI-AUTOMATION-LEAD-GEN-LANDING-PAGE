# Implementation Plan: Comprehensive Metadata & Social Preview Overhaul

## Overview & Objectives
Transform the Meridian Systems landing page from generic default starter metadata (`https://bolt.new/static/og_default.png` and Vite placeholders) into an enterprise-grade, SEO-optimized, and social-media-ready web experience.

This plan details:
1. Capturing a real, high-resolution snapshot (1200x630) of the live website for social sharing (Open Graph & Twitter Cards).
2. Creating custom branded favicons and touch icons matching the Meridian Systems identity (replacing `/vite.svg`).
3. Formulating comprehensive Open Graph, Twitter/X Cards, standard SEO metadata, canonical links, and search indexing directives.
4. Implementing rich structured data (JSON-LD) for Google Rich Results (Organization, ProfessionalService, WebSite).
5. Configuring automated verification across platforms (Twitter/X Card validator, LinkedIn Post Inspector, Facebook Sharing Debugger specifications).

---

## Technical Audit: Current State vs. Target State

| Dimension | Current State | Target State |
|---|---|---|
| **Page Title** | `AI Automation Agency Landing Page` | `Meridian Systems — Bespoke AI Automation & Operational Systems` |
| **Meta Description** | *None* | High-impact 155-character description highlighting custom AI workflows, operational efficiency, and B2B growth |
| **Open Graph (og:)** | Only `og:image` pointing to Bolt default | Complete OG suite (`title`, `description`, `type`, `url`, `site_name`, `image`, `image:width`, `image:height`, `image:alt`, `locale`) |
| **Twitter / X Cards** | `summary_large_image` pointing to Bolt default | Complete Twitter suite (`card`, `title`, `description`, `image`, `image:alt`, optional `creator`/`site`) |
| **Preview Image** | `https://bolt.new/static/og_default.png` | Branded 1200x630 pixel snapshot of Meridian Systems with high-contrast UI preview & branding |
| **Favicon & App Icons** | `/vite.svg` | Branded SVG favicon with emerald accent, plus `apple-touch-icon.png` and `manifest.webmanifest` |
| **Structured Data** | None | Schema.org JSON-LD (`Organization`, `ProfessionalService`, `WebSite`) |
| **Search & Indexing** | Default | Explicit `robots`, canonical URL tag, `theme-color` for mobile browser chrome |

---

## Detailed Implementation Roadmap

### Phase 1: High-Resolution Website Snapshot & Social Asset Generation
- **Target File:** `public/og-image.png` & `public/og-image.webp` (1200 x 630 px, standard aspect ratio 1.91:1)
- **Execution Strategy:**
  1. Leverage browser automation / Puppeteer or subagent screenshot tool targeting the local dev server (`http://localhost:5173`) at a standard 1200x630 viewport.
  2. Capture the striking dark-mode hero section with the live typography, emerald glowing status pill ("AI Automation Agency"), and interactive node diagram.
  3. Ensure file size is optimized (<300 KB for rapid card caching across Discord, Slack, iMessage, Twitter/X, and LinkedIn).
  4. Store production assets in `public/` directory so Vite serves them at root `/og-image.png`.

### Phase 2: Branded Favicons & Mobile Icons
- **Target Files:**
  - `public/favicon.svg` (crisp scalable vector matching the Meridian 4-cell square mark)
  - `public/favicon.ico` / `public/favicon-32x32.png`
  - `public/apple-touch-icon.png` (180x180 px for iOS homescreen bookmarks)
  - `public/site.webmanifest` (PWA / Android homescreen metadata with theme colors `#0a0a0a` and emerald accent `#10b981`)
- **Execution Strategy:**
  1. Extract the geometric grid logo SVG from `LandingPage.tsx` (`<rect>` design) and style with emerald highlight.
  2. Set up high-DPI apple-touch-icon.

### Phase 3: Comprehensive HTML Head Metadata in `index.html`
- **Target File:** `index.html`
- **Specification:**
  - **Primary Meta Tags:**
    - `title`: `Meridian Systems | Enterprise AI Automation & Custom Workflows`
    - `meta[name="description"]`: `Bespoke AI automation and coherent operational systems for high-growth businesses. Stop wasting hours on manual effort.`
    - `meta[name="keywords"]`: `AI automation agency, B2B lead generation, operational workflows, business process automation, custom AI systems`
    - `meta[name="author"]`: `Meridian Systems`
    - `meta[name="theme-color"]`: `#0a0a0a`
    - `meta[name="robots"]`: `index, follow, max-image-preview:large`
    - `link[rel="canonical"]`: Dynamic or configurable production domain
  - **Open Graph Protocol (Facebook, LinkedIn, Discord, Slack):**
    - `og:site_name`: `Meridian Systems`
    - `og:type`: `website`
    - `og:title`: `Meridian Systems | Enterprise AI Automation & Workflow Systems`
    - `og:description`: `We design AI automations that fit how your business actually works, not how a software vendor thinks it should.`
    - `og:image`: `/og-image.png` (and fully qualified URL placeholder)
    - `og:image:secure_url`: `/og-image.png`
    - `og:image:type`: `image/png`
    - `og:image:width`: `1200`
    - `og:image:height`: `630`
    - `og:image:alt`: `Meridian Systems AI Automation Platform Hero Preview`
  - **Twitter / X Cards:**
    - `twitter:card`: `summary_large_image`
    - `twitter:title`: `Meridian Systems | Enterprise AI Automation & Workflow Systems`
    - `twitter:description`: `We design AI automations that fit how your business actually works. Coherent systems that scale.`
    - `twitter:image`: `/og-image.png`
    - `twitter:image:alt`: `Meridian Systems AI Automation Agency Interface`

### Phase 4: Schema.org Structured Data (JSON-LD)
- Add valid `<script type="application/ld+json">` to provide search engines with rich business identity:
  ```json
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://meridiansystems.ai/#organization",
        "name": "Meridian Systems",
        "url": "https://meridiansystems.ai",
        "logo": "https://meridiansystems.ai/favicon.svg",
        "image": "https://meridiansystems.ai/og-image.png",
        "description": "Bespoke AI automation and operational workflow engineering for B2B enterprises.",
        "areaServed": "Global",
        "serviceType": [
          "AI Automation",
          "Workflow Automation",
          "B2B Lead Generation Systems",
          "Operational Systems Integration"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://meridiansystems.ai/#website",
        "url": "https://meridiansystems.ai",
        "name": "Meridian Systems",
        "publisher": {
          "@id": "https://meridiansystems.ai/#organization"
        }
      }
    ]
  }
  ```

### Phase 5: Verification & Quality Assurance Checklist
- [x] Ensure all references to `https://bolt.new/static/og_default.png` and `/vite.svg` are removed.
- [x] Verify image dimensions (1200x630) and visual clarity on light/dark messaging platforms (Slack, Discord, iMessage, LinkedIn).
- [x] Validate HTML syntax and ensure no breaking Vite build issues (`npm run build`).
- [x] Confirm JSON-LD validity against Schema.org validators.
- [x] Validate responsive favicon rendering in Chrome, Safari, and Firefox browser tabs.
