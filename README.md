# Elicit Research & Insights Inc. — Enterprise Intelligence Web Platform

A completely redesigned, contemporary, and high-performance digital presence for **Elicit Research & Insights Inc.**, built from scratch with an original creative direction, editorial typography, asymmetric data intelligence layouts, and robust client-side architecture.

---

## 🏛️ Executive Summary & Source Fidelity

- **Institution:** Elicit Research & Insights Inc.
- **Tagline:** Global Market Research & Information Technology Solutions
- **Primary Contacts:**
  - Official Inquiries: [`info@elicitresearch.com`](mailto:info@elicitresearch.com)
  - Sales & RFQ Bidding Desk: [`RFQ@elicitresearch.com`](mailto:RFQ@elicitresearch.com)
- **Source-Verified Core Metrics:**
  - **5M+** Verified Double Opt-In Panel Members
  - **10K+** Enterprise Studies Completed
  - **$30M+** In Direct Respondent Incentives Distributed
  - **45+** Target Countries Covered (North America, EMEA, APAC, LATAM)

---

## 🎨 Creative Direction & Visual Architecture

- **Aesthetic:** Editorial corporate research, deep obsidian navy (`#050811`, `#070C18`, `#0D1527`), electric cyan (`#00F0FF`, `#06B6D4`), and lumina violet (`#6366F1`) accents.
- **Typography:** Display typography powered by `Outfit` and `Cabinet Grotesk`; body legibility via `Plus Jakarta Sans`.
- **Motion & Telemetry:** Ambient radial meshes, live sampling node animations, reactive statistics, and data stream telemetry cards.
- **Zero AI Template Clutter:** Asymmetric layouts, strategic whitespace, and dedicated bespoke data visualizations.

---

## 🧭 Page & Route Manifest

| Route | Page | Purpose & Key Features |
|---|---|---|
| `/` | **Home** | Strategic value proposition, verified statistics ticker, 10-practice matrix, interactive global reach visualizer, 5-stage methodology pipeline, differentiator cards, and RFQ conversion module. |
| `/services` | **Services (10 Practices)** | In-depth dossiers for all 10 core practices with technical capabilities, deliverables, and one-click RFQ scoping triggers. |
| `/panel` | **Proprietary Panel Platform** | Source facts (**5M+ Panel Members**, **10K+ Survey Done**, **30M+ Rewarded So Far**), B2B vs B2C audience breakdown, interactive regional cluster map, working **Panel Book PDF Download**, and link to panelist platform. |
| `/about` | **About Us & Leadership** | Institutional overview, methodology rigor, ESOMAR / ISO 20252 / GDPR governance alignment, executive leadership governance groups, and global operating hubs (New York, London, Singapore, Bengaluru). |
| `/contact` | **Contact & RFQ Desk** | Direct contact desk cards (`info@elicitresearch.com`, `RFQ@elicitresearch.com`), 2-hour response SLA, and fully validated interactive RFQ & scoping builder. |
| `/careers` | **Careers** | Corporate culture, global open roles, and interactive application modal with validation. |
| `/faq` | **FAQ & Knowledge Base** | Real-time searchable interactive accordion covering panel authenticity, turnaround times, and compliance. |
| `/privacy-policy` | **Privacy Policy** | Comprehensive GDPR, CCPA/CPRA, and ESOMAR-aligned market research data protection and respondent rights. |
| `/terms` | **Terms and Conditions** | Enterprise MSA terms, data ownership, survey integrity, and panelist code of conduct. |
| `*` | **404 Not Found** | High-end fallback page with quick navigation return paths. |

---

## 🛠️ The 10 Core Practices

1. **Survey Programming** (Complex logic, conjoint, MaxDiff, multimedia piping, mobile UI)
2. **Performance Tracking** (Longitudinal brand health, campaign uplift, NPS, telemetry)
3. **Research Design** (Scientific sampling design, hypothesis engineering, power modeling)
4. **Qualitative Research** (Digital focus groups, executive IDIs, mobile ethnography)
5. **Customer Segmentation** (Latent class clustering, psychographic typing tools)
6. **Customer Journey** (Omni-channel touchpoint friction audits, emotional heatmaps)
7. **Communication Strategy** (Message package testing, distinct brand assets, copy testing)
8. **Cultural Insights** (Macro trends, cross-border localization, semiotic audits)
9. **B2B Strategies** (C-Suite decision makers, IT enterprise buyers, supply chain leads)
10. **Growth Strategy** (TAM/SAM sizing, commercial due diligence, GTM roadmaps)

---

## ⚙️ How to Run the Project

### Prerequisites
- Node.js `v18.0.0` or newer (Tested on Node `v23.11.0` and npm `11.6.1`)

### 1. Development Mode
Run the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 2. Production Build
Compile and bundle the production assets:
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.

### 3. Production Preview
Test the production build locally:
```bash
npm run preview
```

---

## ⚡ Functionality Verification

- **Working PDF Panel Book Download:** Integrated with `jspdf` to generate and download an official branded `Elicit-Research-Panel-Book-2026.pdf` containing the verified 5M+ statistics, demographic census tables, and regional coverage.
- **Validated RFQ Submission:** Interactive scoping form with real-time field validation, sample size selectors, and unique reference ID generation (`ER-XXXXXX`).
- **Official Email Routing:** Direct integrations with `info@elicitresearch.com` and `RFQ@elicitresearch.com`.
- **Responsive Across Breakpoints:** Seamless mobile drawer navigation, responsive grid layouts, and touch-optimized interactive components.

---

## 📋 Items Flagged for Optional Backend Setup

1. **Transactional Email Service:** Currently, contact and RFQ submissions generate structured tracking reference numbers and launch client-side confirmation or mailto triggers. To route submissions to automated CRM / inbox delivery, connect a serverless endpoint (e.g. Node/Express, AWS Lambda, SendGrid, or Resend).
2. **Panelist Single Sign-On (SSO):** The "Visit Our Panel Platform" button points to `https://portal.elicitresearch.com`, which can be configured with your OAuth / SAML panel authentication provider.
3. **Executive Team Headshots & Biographies:** In accordance with the prompt guidelines, placeholder executive governance committees have been structured without fabricating unauthorized photos or bios. When official executive headshots are released, they can be added to `src/data/companyData.js`.
