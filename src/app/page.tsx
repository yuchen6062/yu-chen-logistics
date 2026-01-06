"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Plane,
  Ship,
  Package,
  Globe,
  Warehouse,
  Anchor,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";

// ----------------------------------
// Data Configuration (物流業資料)
// ----------------------------------

type Product = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  tags: string[];
  cta: string;
  url?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "國際海運服務",
    subtitle: "整櫃 (FCL) / 併櫃 (LCL)",
    icon: <Ship className="w-5 h-5" />,
    bullets: [
      "全球主要港口進出口承攬",
      "特殊櫃、冷凍櫃、開頂櫃安排",
      "每週固定船期，艙位保證",
    ],
    tags: ["海運", "進出口"],
    cta: "查詢船期",
    url: "#",
  },
  {
    id: "p2",
    title: "國際空運快遞",
    subtitle: "急件處理 / 戶對戶配送",
    icon: <Plane className="w-5 h-5" />,
    bullets: [
      "直飛/轉運航班靈活規劃",
      "機場報關與提貨服務",
      "電子零件、精密儀器專案運送",
    ],
    tags: ["空運", "急件"],
    cta: "空運詢價",
    url: "#",
  },
  {
    id: "p3",
    title: "內陸運輸車隊",
    subtitle: "全台配送網絡",
    icon: <Truck className="w-5 h-5" />,
    bullets: ["自有貨櫃拖車與溫控車隊", "全台長短途併車/專車配送", "GPS 即時車輛動態追蹤"],
    tags: ["陸運", "配送"],
    cta: "預約派車",
    url: "#",
  },
  {
    id: "p4",
    title: "倉儲物流管理",
    subtitle: "第三方物流 (3PL) 解決方案",
    icon: <Warehouse className="w-5 h-5" />,
    bullets: [
      "保稅倉庫與一般倉庫租賃",
      "進出貨理貨、貼標、重新包裝",
      "WMS 系統庫存即時查詢",
    ],
    tags: ["倉儲", "加值服務"],
    cta: "參觀倉庫",
    url: "#",
  },
  {
    id: "p5",
    title: "進出口報關",
    subtitle: "通關效率優化",
    icon: <ShieldCheck className="w-5 h-5" />,
    bullets: [
      "專業關務諮詢與稅則歸類",
      "三角貿易與轉口貿易文件製作",
      "代辦各類檢驗檢疫 (BSMI/FDA)",
    ],
    tags: ["報關", "稅務"],
    cta: "諮詢關務",
    url: "#",
  },
  {
    id: "p6",
    title: "專案物流 (Project Cargo)",
    subtitle: "超大/超重貨物",
    icon: <Anchor className="w-5 h-5" />,
    bullets: [
      "整廠設備輸出入規劃",
      "散裝船租賃與裝卸",
      "路線探勘與運輸風險評估",
    ],
    tags: ["專案", "重件"],
    cta: "專案規劃",
    url: "#",
  },
];

const TECH_STACK = [
  "Global Network", "WMS System", "GPS Tracking", "Customs Brokerage", "Supply Chain", "Last Mile", "Cold Chain", "Cross-border", "Door-to-Door", "FCL/LCL", "Air Freight", "ERP Integration"
] as const;

const STEPS = [
  { title: "需求諮詢", desc: "確認貨物類型、起迄點、時效要求與預算範圍。" },
  { title: "方案報價", desc: "規劃最佳運輸路徑（海/空/陸）並提供詳細費用明細。" },
  { title: "安排運送", desc: "訂艙、提貨、報關、裝運，並提供貨物追蹤代碼。" },
  { title: "貨物抵達", desc: "目的港清關、派送至指定地點，完成簽收證明 (POD)。" },
] as const;

const FAQ = [
  { q: "海運跟空運的材積如何計算？", a: "海運以 CBM (立方公尺) 計算；空運則依體積重 (長x寬x高/6000) 與實重取大者計價。" },
  { q: "是否提供貨物保險？", a: "是的，我們與多家國際保險公司合作，可協助代辦全險 (All Risks) 保障您的貨物安全。" },
  { q: "三角貿易的文件如何處理？", a: "我們具備豐富的 Switch B/L (換單) 經驗，能確保供應商資訊保密，順利完成跨國交易。" },
  { q: "危險品 (DG) 可以運送嗎？", a: "可以，請提供 MSDS 表單，我們會依 IMDG Code 規範安排合適的危險品艙位與包裝。" },
] as const;

const TAGS = ["海運", "空運", "陸運", "倉儲", "報關", "專案"] as const;

// ----------------------------------
// Sub-Components
// ----------------------------------

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <Card key={p.id} className="rounded-2xl hover:shadow-xl transition-shadow flex flex-col dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-[#003366] dark:text-blue-400">{p.icon}</span> {p.title}
            </CardTitle>
            <CardDescription>{p.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags?.map((t) => (
                <Badge key={t} variant="outline" className="dark:border-slate-700 dark:text-slate-300">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-4 border-t dark:border-slate-800">
             <Button className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold border-none dark:bg-blue-600 dark:hover:bg-blue-700">
               {p.cta}
             </Button>
            <a href="#contact" aria-label={`詢問 ${p.title}`} className="w-full">
              <Button size="sm" variant="outline" className="w-full dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">立即諮詢</Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// ----------------------------------
// Main Site Component
// ----------------------------------

export default function Site() {
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // 自動偵測深色模式
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    handleThemeChange();
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const tag = activeTab === "all" ? null : activeTab;

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchKw =
        !kw ||
        [p.title, p.subtitle, ...p.bullets, ...(p.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(kw);
      const matchTag = !tag || p.tags?.includes(tag as any);
      return matchKw && matchTag;
    });
  }, [keyword, tag]);

  return (
    <div className="min-h-screen bg-background text-foreground relative dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
      
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 dark:text-white">
        跳到主要內容
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b dark:bg-slate-950/70 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-lg md:text-xl flex items-center gap-2" aria-label="宇辰國際物流 首頁">
            {/* Logo Icon Mockup */}
            <div className="bg-[#003366] text-white p-1 rounded dark:bg-blue-600">
                <Globe size={20} />
            </div>
            <span className="mr-1 text-[#003366] dark:text-blue-400">宇辰國際物流</span>
            <span className="hidden sm:inline text-xs text-muted-foreground font-medium uppercase tracking-widest">Yu-Chen Logistics</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm font-medium" aria-label="主導覽">
            <a href="#about" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">關於我們</a>
            <a href="#products" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">服務項目</a>
            <a href="#track" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">貨況查詢</a>
            <a href="#contact" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">聯絡我們</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex">
              <Button size="sm" className="bg-[#003366] text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                線上詢價
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              連結世界 <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">運籌帷幄的物流夥伴</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              宇辰國際物流 (Yu-Chen International) 整合海空運、倉儲與內陸運輸，為您的供應鏈提供最精準、快速的解決方案。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products">
                <Button size="lg" className="bg-[#003366] text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Ship className="w-5 h-5 mr-2" />
                  探索服務
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="border-[#003366] text-[#003366] dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-900">
                  聯絡業務
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TECH_STACK.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full bg-white border shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                  {s}
                </Badge>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-xl border-t-4 border-t-[#003366] dark:bg-slate-900 dark:border-slate-800 dark:border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#003366] dark:text-blue-400" /> 全球物流網絡
                </CardTitle>
                <CardDescription>即時追蹤您的貨物動態</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">150+</div>
                    <div className="text-[10px] text-muted-foreground">全球代理</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">99%</div>
                    <div className="text-[10px] text-muted-foreground">準時送達</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">24h</div>
                    <div className="text-[10px] text-muted-foreground">客服支援</div>
                  </div>
                </div>
                <Separator className="my-4 dark:bg-slate-700" />
                <ul className="text-sm space-y-2">
                  {["報關：BSMI/FDA 專業代辦", "運輸：門到門一站式服務", "倉儲：即時庫存可視化"].map((txt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" /> {txt}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="關於宇辰" subtitle="深耕台灣，佈局全球的物流專家">
        <div className="grid md:grid-cols-3 gap-6">
          {[
             { title: "專業團隊", desc: "擁有超過 20 年物流經驗的專業團隊，熟悉各國進出口法規與關務流程。", icon: <ShieldCheck /> },
             { title: "全球據點", desc: "與全球 150+ 國家代理緊密合作，服務網絡遍及歐美、東南亞及中國大陸。", icon: <Globe /> },
             { title: "智慧物流", desc: "導入 WMS 倉儲管理與 GPS 車隊系統，提供客戶即時、透明的貨況資訊。", icon: <Truck /> },
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl border-none shadow-sm bg-slate-50 dark:bg-slate-900/50 dark:border dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#003366] dark:text-blue-400">
                  {item.icon} {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {item.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Products & services */}
      <Section id="products" title="服務項目" subtitle="全方位的供應鏈解決方案">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
          <TabsList className="flex flex-wrap bg-slate-100 dark:bg-slate-900 p-1">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">全部服務</TabsTrigger>
            {TAGS.map((t) => (
              <TabsTrigger key={t} value={t} onClick={() => setActiveTab(t)} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">{t}</TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder="搜尋服務：例如 海運、報關、美國線..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          <TabsContent value={activeTab} className="mt-6">
            <ProductGrid items={filtered} />
          </TabsContent>
        </Tabs>
      </Section>

      {/* Process */}
      <Section id="process" title="服務流程" subtitle="標準化作業，確保貨物安全送達">
        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Card key={i} className="rounded-2xl dark:bg-slate-900 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full dark:bg-slate-800 dark:text-slate-200">{i + 1}</Badge>
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="聯絡我們"
        subtitle="立即諮詢，獲取最優惠的運費報價"
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 左側：聯絡資訊 */}
          <Card className="rounded-2xl border-2 border-[#003366]/10 dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle>宇辰國際物流有限公司</CardTitle>
              <CardDescription>Yu-Chen International Logistics Co., Ltd.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-3">
                 <MapPin className="text-[#003366] dark:text-blue-400" />
                 <div>
                   <div className="font-medium">總公司地址</div>
                   <div className="text-sm text-muted-foreground">桃園市中壢區... (請填入完整地址)</div>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Phone className="text-[#003366] dark:text-blue-400" />
                 <div>
                   <div className="font-medium">聯絡電話</div>
                   <div className="text-sm text-muted-foreground">03-123-4567</div>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Clock className="text-[#003366] dark:text-blue-400" />
                 <div>
                   <div className="font-medium">營業時間</div>
                   <div className="text-sm text-muted-foreground">週一至週五 09:00 - 18:00</div>
                 </div>
               </div>
               <Separator className="my-2" />
               <div className="flex gap-2">
                 <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                   LINE 官方帳號
                 </Button>
                 <Button variant="outline" className="flex-1">
                   Facebook 粉絲專頁
                 </Button>
               </div>
            </CardContent>
          </Card>

          {/* 右側：FAQ */}
          <div className="space-y-6">
            <Card className="rounded-2xl dark:bg-slate-900 dark:border-slate-800">
              <CardHeader>
                <CardTitle>常見問題 (FAQ)</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {FAQ.map((f, i) => (
                    <AccordionItem value={`item-${i}`} key={i} className="dark:border-slate-800">
                      <AccordionTrigger className="text-left dark:text-slate-200">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-12 bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-[#003366] dark:text-blue-400">宇辰國際物流有限公司</div>
            <div className="text-xs text-muted-foreground uppercase">Yu-Chen International Logistics Co., Ltd.</div>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yu-Chen Logistics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}