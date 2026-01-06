import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        {/* 頂部導覽列 */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo 區 */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-lg">Y</div>
              <span className="text-xl font-bold text-blue-900 tracking-tight">宇辰國際物流</span>
            </div>
            
            {/* 選單連結 */}
            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
              <Link href="/" className="hover:text-blue-700 transition-colors">首頁</Link>
              <Link href="#about" className="hover:text-blue-700 transition-colors">關於我們</Link>
              <Link href="#logistics" className="hover:text-blue-700 transition-colors">物流服務</Link>
              <Link href="#global" className="hover:text-blue-700 transition-colors">全球據點</Link>
              <Link href="#contact" className="hover:text-blue-700 transition-colors">聯絡我們</Link>
            </nav>

            {/* 手機版選單按鈕 */}
            <button className="md:hidden text-slate-700">☰</button>
          </div>
        </header>

        {/* 主要內容區 */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 頁尾 */}
        <footer className="bg-slate-900 text-slate-300 py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">宇辰國際物流有限公司</h3>
              <p>誠信、效率、專業。致力於為客戶提供無縫接軌的全球物流解決方案。</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">聯絡資訊</h3>
              <p>總公司：桃園市中壢區...</p>
              <p>電話：03-123-4567</p>
              <p>Email：service@yu-chen.com.tw</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">快速連結</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">貨況查詢</Link></li>
                <li><Link href="#" className="hover:text-white">人力資源</Link></li>
                <li><Link href="#" className="hover:text-white">隱私權政策</Link></li>
              </ul>
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