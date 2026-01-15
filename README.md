\
**線上網站**: [https://www.yuchen606266.com.tw](https://www.yuchen606266.com.tw)

## 本機執行（Windows 範例：放到 `C:\JI_company`）

1. 下載本專案 ZIP，解壓縮到 `C:\yuchen_company\yuchen_company\`。  
2. 開啟 PowerShell / VS Code 內建終端機：
   ```powershell
   cd C:\yuchen_company\yuchen_company
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

---

如需 **表單串接 FastAPI/Flask 寄信**、**GA/Meta Pixel 事件**、**Docker + Nginx + SSL**，告訴我要放的網域與需求，我可直接補檔。


# 1. 加入所有變更
git add .

# 2. 寫下這次改了什麼 (例如：新增Python服務介紹)
git commit -m "Add new Python service product"

# 3. 推送到 GitHub (這會觸發 Vercel 自動更新)
git push






# 1. 初始化 Git (讓資料夾變成 Git 專案)
git init


# 2. 將所有檔案加入暫存區
git add .

# 3. 提交第一次版本 (Create first commit)
git commit -m "Initial commit: Yu-Chen Logistics Website"

# 4. 將分支重新命名為 main (目前主流標準)
git branch -M main

# 5. 連結到你剛剛在 GitHub 建立的倉庫
# ★請將下方的網址換成你剛剛複製的網址★
git remote add origin https://github.com/yuchen6062/yu-chen-logistics.git

# 6. 推送上去
git push -u origin main
