import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Plane, Warehouse, ArrowRight, Anchor, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      
      {/* 1. Hero Section (主視覺) */}
      <section className="relative h-[600px] w-full flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop')" }} 
        />
        
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <div className="inline-block px-3 py-1 mb-6 border border-blue-400 rounded-full text-blue-300 text-sm tracking-wider">
            YU-CHEN INTERNATIONAL LOGISTICS
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            連結世界 <br/> 運籌帷幄的物流夥伴
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            宇辰國際物流整合海空運與內陸運輸網絡，<br/>為您的企業提供精準、快速的全球供應鏈服務。
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-900/20">
              服務項目
            </Button>
            <Button variant="outline" className="h-12 px-8 text-lg bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
              線上詢價
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Services Section (核心事業) */}
      <section id="logistics" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">全方位物流服務</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500">從倉儲到配送，我們提供一站式解決方案</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Truck className="h-10 w-10 text-white" />}
              title="內陸運輸"
              desc="擁有自有車隊與智慧派遣系統，提供全台長短途運輸、貨櫃拖運及專車配送服務，確保貨物準時送達。"
            />
            <ServiceCard 
              icon={<Plane className="h-10 w-10 text-white" />} // 改為飛機/船運意象
              title="國際海空運"
              desc="與全球各大航運及航空公司緊密合作，提供進出口報關、船期安排及跨境物流整合服務。"
            />
            <ServiceCard 
              icon={<Warehouse className="h-10 w-10 text-white" />}
              title="倉儲物流"
              desc="提供現代化倉儲管理、理貨包裝、流通加工及庫存管理系統，協助客戶優化庫存成本與效率。"
            />
          </div>
        </div>
      </section>

      {/* 3. Stats Section (數據展示) */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800/50">
            <StatItem value="150+" label="全球代理" />
            <StatItem value="20+" label="服務年資" />
            <StatItem value="100%" label="通關效率" />
            <StatItem value="24hr" label="專人服務" />
          </div>
        </div>
      </section>

      {/* 4. News Section (最新消息) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">最新消息</h2>
              <p className="text-slate-500 mt-2">關注宇辰的最新動態與航運公告</p>
            </div>
            <Button variant="ghost" className="text-blue-700 hover:text-blue-900">
              查看更多 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            {[
              { date: "2026/01/05", tag: "公司公告", title: "宇辰國際物流導入新一代 WMS 倉儲系統，提升出貨效率" },
              { date: "2025/12/28", tag: "航運快訊", title: "因應農曆春節假期，請客戶提早安排進出口艙位預訂" },
              { date: "2025/11/15", tag: "榮譽榜", title: "榮獲 2025 年度優良報關企業獎殊榮" },
            ].map((news, i) => (
              <div key={i} className="group bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 cursor-pointer">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <span className="text-sm font-mono text-slate-400">{news.date}</span>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{news.tag}</span>
                </div>
                <h3 className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors flex-grow">
                  {news.title}
                </h3>
                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact / CTA (聯絡區塊) */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">準備好優化您的物流供應鏈了嗎？</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                無論是複雜的專案運輸、急件空運或長期倉儲需求，宇辰專業團隊隨時為您服務。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 border-none h-12 px-8 font-bold">
                  立即聯絡我們
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-blue-700 h-12 px-8">
                  下載公司簡介
                </Button>
              </div>
            </div>
            {/* 裝飾背景 */}
            <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-blue-500 opacity-20 rotate-12" />
          </div>
        </div>
      </section>

    </div>
  );
}

// 輔助組件：服務卡片
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <CardHeader className="bg-blue-600 p-6 flex justify-center items-center group-hover:bg-blue-700 transition-colors">
        <div className="bg-white/20 p-4 rounded-full ring-4 ring-white/10 backdrop-blur-sm">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-8 text-center">
        <CardTitle className="text-xl mb-4 text-slate-800">{title}</CardTitle>
        <p className="text-slate-600 leading-relaxed text-sm">
          {desc}
        </p>
        <div className="mt-6 pt-6 border-t border-slate-100">
          <span className="text-blue-600 text-sm font-bold flex items-center justify-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
            了解更多 <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// 輔助組件：數據項目
function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{value}</div>
      <div className="text-blue-200 font-medium">{label}</div>
    </div>
  )
}