\
# Sonic Analytics – Next.js Landing Page

可直接執行的 Next.js (App Router + TS + Tailwind) 專案骨架，內建最小 UI 元件，已放入首頁 `src/app/page.tsx`。

## 本機執行（Windows 範例：放到 `C:\JI_company`）

1. 下載本專案 ZIP，解壓縮到 `C:\JI_company\sonic-analytics`。  
2. 開啟 PowerShell / VS Code 內建終端機：
   ```powershell
   cd C:\JI_company\sonic-analytics
   npm.cmd run dev
   ```
3. 瀏覽 `http://localhost:3000`。

> Node.js 建議版本：18 或 20。

## 專案結構

```
sonic-analytics/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  └─ components/
│     └─ ui/
│        ├─ accordion.tsx
│        ├─ badge.tsx
│        ├─ button.tsx
│        ├─ card.tsx
│        ├─ input.tsx
│        ├─ separator.tsx
│        ├─ tabs.tsx
│        └─ textarea.tsx
├─ .gitignore
├─ next-env.d.ts
├─ next.config.mjs
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```

> 若你之後想改回 **shadcn/ui 官方元件**：移除 `src/components/ui`，再依序執行：  
> `npx shadcn@latest init -d`  
> `npx shadcn@latest add button input textarea card tabs accordion separator badge`

## 建置/部署

- Production 建置：`npm run build` → `npm run start`  
- Docker 化：因 `next.config.mjs` 設為 `output: 'standalone'`，可直接把 `.next/standalone` 帶上線，或自行撰寫 `Dockerfile`。

