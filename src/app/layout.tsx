import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Link from "next/link"; // 導覽列移除後，暫時用不到 Link，可以註解掉或移除

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "宇辰國際物流有限公司 | 全球物流與供應鏈整合專家",
  description: "提供專業海空運、內陸運輸、報關及倉儲物流整合服務。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        
        {/* 已移除全域導覽列 (Header) 
            因為您已在個別頁面中加入 Navbar，移除這裡可避免重複顯示。
        */}

        {/* 主要內容區 */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 頁尾 (Footer) - 通常建議保留在 Layout 中以維持全站一致，若您也想在個別頁面控制，也可以移除 */}
        <footer className="bg-slate-900 text-slate-300 py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">宇辰國際物流有限公司</h3>
              <p>誠信、效率、專業。致力於為客戶提供無縫接軌的全球物流解決方案。</p>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2026 Yu-Chen International Logistics Co., Ltd. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}