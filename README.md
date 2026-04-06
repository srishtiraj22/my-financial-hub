# FinVue — Personal Finance Dashboard

A clean, interactive personal finance dashboard built with **React**, **TypeScript**, and **Tailwind CSS**. Designed to visualize spending, track transactions, and gain financial insights — all on the frontend.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-06B6D4) ![Vite](https://img.shields.io/badge/Vite-5-646CFF)

---

## ✨ Features

### 📊 Dashboard
- **Summary Cards** — Total balance, income, and expenses at a glance (INR ₹)
- **Balance Trend Chart** — Line/area chart showing income vs expense trends over time
- **Spending Breakdown** — Pie/donut chart with category-wise expense distribution
- **Recent Transactions** — Quick view of the latest financial activity

### 💸 Transactions
- Full CRUD — Add, edit, and delete transactions
- Advanced filtering by type (income/expense), category, date range, and search
- Sorting by date or amount (ascending/descending)
- Role-based access control (Admin: full access, Viewer: read-only)
- Responsive data table with category icons and color coding

### 📈 Insights
- Monthly income vs expense comparison bar chart
- Top spending categories breakdown
- Month-over-month trend analysis
- Key financial metrics (savings rate, avg daily spend, largest expense)

### 👤 Profile
- Editable user profile (name, email, phone, job title, location, bio)
- Profile photo upload with live preview
- Dynamic sidebar branding — name and avatar update across the app in real time
- Initials-based fallback avatar when no photo is set

### 🎨 UI/UX
- **Dark/Light mode** toggle with persistent theme
- Fully responsive layout (mobile sidebar with sheet drawer)
- Collapsible sidebar navigation
- Smooth animations and transitions
- Built with **shadcn/ui** component library for consistent design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Charts | Recharts |
| Routing | React Router v6 |
| Build Tool | Vite 5 |
| State | React Context API |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Playwright |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard widgets (charts, cards, transactions)
│   ├── layout/             # AppLayout, AppSidebar
│   └── ui/                 # Reusable shadcn/ui components
├── context/
│   └── FinanceContext.tsx   # Global state (transactions, profile, theme, filters)
├── data/
│   └── mockData.ts         # Mock transactions, categories, colors, icons
├── hooks/                  # Custom hooks (use-mobile, use-toast)
├── pages/
│   ├── Dashboard.tsx       # Main dashboard view
│   ├── Transactions.tsx    # Transaction management page
│   ├── Insights.tsx        # Analytics & insights page
│   ├── Profile.tsx         # User profile editor
│   └── NotFound.tsx        # 404 page
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Route definitions
├── main.tsx                # Entry point
└── index.css               # Global styles & design tokens
```

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/srishtiraj22/my-financial-hub

# How to run this project
cd finvue-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:XXXX`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Key Design Decisions

1. **No backend required** — All data is stored in `localStorage` for persistence across sessions
2. **Role-based UI** — Admin/Viewer toggle controls edit permissions without authentication
3. **Component separation** — Each page and widget is in its own file for maintainability
4. **Context API** — Single `FinanceContext` manages all global state (transactions, filters, profile, theme)
5. **Semantic design tokens** — Colors defined via CSS custom properties for easy theming
6. **Indian Rupee (₹)** — Currency formatted using `Intl.NumberFormat` with `en-IN` locale

---

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| `/` | Dashboard with summary cards, charts, and recent transactions |
| `/transactions` | Full transaction list with CRUD, filters, and sorting |
| `/insights` | Financial analytics with charts and key metrics |
| `/profile` | User profile editor (click avatar in sidebar to access) |

---


