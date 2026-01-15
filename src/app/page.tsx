"use client";

import React, { useMemo, useState, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Plane,
  Ship,
  Globe,
  Warehouse,
  Anchor,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  ChevronDown,
  FileText,
  Container,
  Menu, // 新增 Menu 圖示給手機版選單使用
} from "lucide-react";

// ----------------------------------
// Data Configuration
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
    title: "國際海運進出口",
    subtitle: "全球航線 FCL/LCL 承攬",
    icon: <Ship className="w-5 h-5" />,
    bullets: [
      "歐美、東南亞、大陸航線艙位保證",
      "進出口整櫃 (FCL) 與併櫃 (LCL) 規劃",
      "特殊櫃 (平板/開頂/冷凍) 運送安排",
    ],
    tags: ["海運", "進出口", "整櫃/併櫃"],
    cta: "詳細介紹",
    url: "/reports/國際海運進出口.html",
  },
  {
    id: "p2",
    title: "專業進出口報關",
    subtitle: "快速通關與稅則諮詢",
    icon: <FileText className="w-5 h-5" />,
    bullets: [
      "進出口報單製作與 C1/C2/C3 通關處理",
      "ECFA、FTA 產地證明與稅則優惠申請",
      "代辦各類檢驗 (BSMI/FDA/動植物檢疫)",
    ],
    tags: ["報關", "稅務", "檢驗代辦"],
    cta: "詳細介紹",
    url: "/reports/專業進出口報關.html",
  },
  {
    id: "p3",
    title: "國內內陸運輸",
    subtitle: "CY 貨櫃拖車 / 散貨派送",
    icon: <Truck className="w-5 h-5" />,
    bullets: [
      "自有貨櫃拖車隊 (20呎/40呎/45呎)",
      "基隆/台中/高雄港往返全台各地運送",
      "特殊板車與氣墊車安排，確保貨物安全",
    ],
    tags: ["陸運", "拖車", "全台配送"],
    cta: "詳細介紹",
    url: "/reports/國內內陸運輸.html",
  },
  {
    id: "p4",
    title: "進出口一條龍服務",
    subtitle: "門到門 (Door to Door) 整合",
    icon: <Globe className="w-5 h-5" />,
    bullets: [
      "整合海運+報關+陸運，單一窗口服務",
      "三角貿易 (Switch B/L) 與轉口操作",
      "全程貨況追蹤，精準掌握交貨期",
    ],
    tags: ["一條龍", "門到門", "三角貿易"],
    cta: "詳細介紹",
    url: "/reports/進出口一條龍服務.html",
  },
  {
    id: "p5",
    title: "倉儲與加值服務",
    subtitle: "保稅/非保稅倉儲管理",
    icon: <Warehouse className="w-5 h-5" />,
    bullets: [
      "進出口拆櫃、裝櫃與理貨作業",
      "標籤黏貼、重新包裝與分貨配送",
      "配合電商物流與專案貨物暫存",
    ],
    tags: ["倉儲", "理貨"],
    cta: "詳細介紹",
    url: "/reports/倉儲與加值服務.html",
  },
  {
    id: "p6",
    title: "國際空運快遞",
    subtitle: "急件樣品 / 精密儀器",
    icon: <Plane className="w-5 h-5" />,
    bullets: [
      "全球主要機場直飛與轉運航班",
      "急件報關與當日提貨派送",
      "半導體設備與精密儀器專案運送",
    ],
    tags: ["空運", "急件"],
    cta: "詳細介紹",
    url: "/reports/國際空運快遞.html",
  },
];

const TECH_STACK = [
  "Customs Clearance", "Ocean Freight", "Inland Trucking", "Door-to-Door", "Bonded Warehouse", "Supply Chain", "Import/Export", "FCL/LCL", "Project Cargo", "Triangle Trade"
] as const;

const STEPS = [
  { title: "詢價與訂艙", desc: "確認貨物細節 (品名/重量/材積)，規劃最佳海運或空運航程。" },
  { title: "報關與檢驗", desc: "準備商業發票與裝箱單，由專業人員代辦進出口通關與檢驗。" },
  { title: "提貨與運輸", desc: "安排拖車至港口提櫃，或透過卡車進行內陸派送作業。" },
  { title: "送達與簽收", desc: "貨物安全送達指定工廠或倉庫，完成 POD 簽收證明。" },
] as const;

const FAQ = [
  { q: "進出口報關需要準備哪些文件？", a: "基本文件包含：商業發票 (Invoice)、裝箱單 (Packing List) 及提單 (B/L)。若涉及特殊貨品，可能需要產地證明 (C/O) 或檢驗合格證。" },
  { q: "海運進口後的內陸運輸如何安排？", a: "我們擁有配合的貨櫃拖車與回頭車資源，當貨物抵港並完成報關後，可立即安排 CY 拖櫃或拆櫃後的散貨配送至全台各地。" },
  { q: "如果貨物被海關查驗 (C3) 怎麼辦？", a: "我們會立即指派現場人員配合海關開箱驗貨，並協助解釋貨品內容，盡速排除疑慮以完成放行，降低滯報費風險。" },
  { q: "三角貿易 (Triangle Trade) 如何保密供應商資料？", a: "我們專精於 Switch B/L (換單) 操作，在第三地進行文件置換，確保您的國外買家不會看到原始供應商的資訊。" },
] as const;

const TAGS = ["海運", "報關", "陸運", "倉儲", "一條龍"] as const;

// ----------------------------------
// Sub-Components
// ----------------------------------

// 新增 Navbar 元件
const Navbar = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:border-slate-800">
    <div className="container flex h-16 items-center justify-between mx-auto px-4 max-w-6xl">
      <div className="flex items-center gap-2">
        <a href="/" className="flex items-center space-x-2">
          {/* 修改 LOGO 區塊 */}
          <img 
            src="/reports/Logo.png" 
            alt="宇辰國際物流 Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span className="hidden font-bold sm:inline-block text-xl text-[#003366] dark:text-white">
            宇辰國際物流
          </span>
        </a>
      </div>
      
      {/* 電腦版選單 */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#home" className="transition-colors hover:text-foreground/80 text-foreground/60">首頁</a>
        <a href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">關於我們</a>
        <a href="#service" className="transition-colors hover:text-foreground/80 text-foreground/60">服務項目</a>
        <a href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">聯絡我們</a>
      </nav>

      {/* 手機版選單按鈕 (示意) */}
      <Button variant="ghost" className="md:hidden h-8 w-8 px-0">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </div>
  </header>
);

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
            <a 
              href={p.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full"
            >
              <Button className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold border-none dark:bg-blue-600 dark:hover:bg-blue-700">
                {p.cta}
              </Button>
            </a>
            
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
      
      {/* 插入 Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          
          {/* 左側文字區塊 */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              海運・報關・運輸 <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">進出口物流的最佳夥伴</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              宇辰國際物流 (Yu-Chen International) 專注於國際海運承攬、專業報關與內陸運輸調度，為您提供一站式的高效供應鏈服務。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#service">
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
          </div>

          {/* 右側卡片區塊 */}
          <div>
            <Card className="rounded-2xl shadow-xl border-t-4 border-t-[#003366] dark:bg-slate-900 dark:border-slate-800 dark:border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#003366] dark:text-blue-400" /> 全球物流整合
                </CardTitle>
                <CardDescription>海運、報關、陸運 完美銜接</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">100%</div>
                    <div className="text-[10px] text-muted-foreground">報關準確率</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">Top</div>
                    <div className="text-[10px] text-muted-foreground">優質車隊</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">24h</div>
                    <div className="text-[10px] text-muted-foreground">專人服務</div>
                  </div>
                </div>
                <Separator className="my-4 dark:bg-slate-700" />
                <ul className="text-sm space-y-2">
                  {["海運：全球主要港口進出口", "報關：專業稅則歸類諮詢", "陸運：全台貨櫃拖車配送"].map((txt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" /> {txt}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="關於宇辰" subtitle="深耕台灣，連結世界的物流專家">
        <div className="grid md:grid-cols-3 gap-6">
          {[
             { title: "專業關務團隊", desc: "擁有資深報關人員，熟悉各國進出口法規、稅則歸類與檢驗規範，協助客戶快速通關。", icon: <FileText /> },
             { title: "海運承攬優勢", desc: "與各大船公司簽訂合約，提供具競爭力的運價與穩定的艙位，整櫃併櫃皆可安排。", icon: <Ship /> },
             { title: "強大內陸車隊", desc: "自有與協力車隊網絡遍布全台，提供從港口到門點 (Door) 的高效率運輸服務。", icon: <Truck /> },
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
      <Section id="service" title="服務項目" subtitle="海運、報關、內陸運輸一條龍">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
          <TabsList className="flex flex-wrap bg-slate-100 dark:bg-slate-900 p-1">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">全部服務</TabsTrigger>
            {TAGS.map((t) => (
              <TabsTrigger key={t} value={t} onClick={() => setActiveTab(t)} className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">{t}</TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder="搜尋服務：例如 報關、拖車、進口..."
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
      <Section id="process" title="標準化作業流程" subtitle="SOP 管控，確保進出口順暢">
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
        subtitle="立即諮詢，取得海運與報關優惠報價"
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 左側：聯絡資訊 */}
          <Card className="rounded-2xl border-2 border-[#003366]/10 dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle>宇辰國際物流有限公司</CardTitle>
              <CardDescription>Yu-Chen International Logistics Co., Ltd.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex flex-col md:flex-row gap-6 items-start">
                   {/* 左邊：聯絡文字 */}
                   <div className="space-y-4 flex-1">
                       <div className="flex items-center gap-3">
                         <MapPin className="text-[#003366] dark:text-blue-400 shrink-0" />
                         <div>
                           <div className="font-medium">總公司地址</div>
                           <div className="text-sm text-muted-foreground">桃園市桃園區縣府路256巷16號</div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <Phone className="text-[#003366] dark:text-blue-400 shrink-0" />
                         <div>
                           <div className="font-medium">聯絡電話</div>
                           <div className="text-sm text-muted-foreground">03-3345369</div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <Clock className="text-[#003366] dark:text-blue-400 shrink-0" />
                         <div>
                           <div className="font-medium">營業時間</div>
                           <div className="text-sm text-muted-foreground">週一至週五 09:00 - 18:00</div>
                         </div>
                       </div>
                   </div>

                   {/* 右邊：QR Code */}
                   <div className="flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                     <img 
                       src="/reports/LineQR.png" 
                       alt="LINE QR Code" 
                       className="w-28 h-28 object-contain mix-blend-multiply dark:mix-blend-normal" 
                     />
                     <span className="text-[10px] text-muted-foreground mt-1">掃描加入好友</span>
                   </div>
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
                <div className="w-full space-y-2">
                  {FAQ.map((f, i) => (
                    <div key={i} className="border-b dark:border-slate-800 last:border-0">
                      <button
                        onClick={() => toggleFaq(i)}
                        className="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline w-full text-left dark:text-slate-200"
                      >
                        {f.q}
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            openFaqIndex === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaqIndex === i ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="text-sm text-muted-foreground">
                          {f.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}