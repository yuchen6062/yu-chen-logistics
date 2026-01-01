"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  BarChart3,
  Code2,
  LineChart,
  Mail,
  Rocket,
  CheckCircle2,
  Brain,
  Box,
  Activity,
  Volume2,
  VolumeX,
} from "lucide-react";

// ----------------------------------
// Data Configuration (保持不變)
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
    title: "JMP (JSL) 代寫",
    subtitle: "平台自動化與報告產出",
    icon: <Code2 className="w-5 h-5" />,
    bullets: [
      "JSL 腳本 / 應用程式（Application Builder）",
      "資料表處理、欄位屬性、公式（Column Formula）",
      "批次報告：PDF / RTF / HTML 輸出",
    ],
    tags: ["JSL", "代寫"],
    cta: "了解代寫流程",
    url: "/reports/JSLwirt.html",
  },
  {
    id: "p2",
    title: "JMP 互動視覺化",
    subtitle: "Graph Builder / Control Chart",
    icon: <BarChart3 className="w-5 h-5" />,
    bullets: [
      "Graph Builder 儀表板",
      "Control Chart Builder / SPC",
      "Profiler / Local Data Filter",
    ],
    tags: ["視覺化", "SPC"],
    cta: "查看展示",
    url: "/reports/GraphBuilder.html",
  },
  {
    id: "p3",
    title: "量測系統分析 MSA",
    subtitle: "GR&R / 偏差 / 穩定性",
    icon: <Activity className="w-5 h-5" />,
    bullets: ["MSA 平台操作與解讀", "JSL 一鍵重跑與匯出", "與製程 SPC 串接"],
    tags: ["MSA"],
    cta: "索取範例報告",
    url: "/reports/MSA.html",
  },
  {
    id: "p4",
    title: "JMP 預測建模 (Pro)",
    subtitle: "建模到解釋",
    icon: <Brain className="w-5 h-5" />,
    bullets: [
      "Decision Tree / Boosting / Neural",
      "交叉驗證、評估、Profiler",
      "模型部署腳本化",
    ],
    tags: ["建模"],
    cta: "預約技術諮詢",
    url: "/reports/model.html",
  },
  {
    id: "p5",
    title: "資料連線與自動化流程",
    subtitle: "Query → 清理 → 報告",
    icon: <Box className="w-5 h-5" />,
    bullets: [
      "JMP Query Builder / ODBC",
      "批次排程（Windows 排程 + JSL Batch）",
      "Add-in / Project 封裝",
    ],
    tags: ["JSL", "工程"],
    cta: "討論需求",
    url: "/reports/Auto.html",
  },
  {
    id: "p6",
    title: "JMP 教育訓練與顧問",
    subtitle: "量身打造課綱",
    icon: <Rocket className="w-5 h-5" />,
    bullets: [
      "JMP 基礎到進階（Graph / DOE / MSA / SPC）",
      "JSL 腳本實作與最佳化",
      "專題導向教學與內訓認證",
    ],
    tags: ["顧問/訓練"],
    cta: "取得課綱",
    url: "/reports/training.html",
  },
];

const TECH_STACK = [
  "JMP", "JSL", "Graph Builder", "Control Chart Builder", "DOE", "MSA", "SPC", "Prediction Profiler", "Fit Model", "Partition", "Bootstrap", "Application Builder", "Add-in", "JMP Query", "Data Table", "Column Formula", "Project", "Scripting Index",
] as const;

const TAGS = ["JSL", "視覺化", "MSA", "DOE", "SPC", "建模", "顧問/訓練"] as const;

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
  // 修改：背景設為 bg-white dark:bg-slate-950
  <section id={id} className="scroll-mt-24 py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        {/* 修改：標題顏色 text-[#003366] dark:text-blue-400 */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#003366] dark:text-blue-400">{title}</h2>
        {/* 修改：副標顏色 text-slate-600 dark:text-slate-400 */}
        {subtitle && <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <Card key={p.id} className="rounded-2xl hover:shadow-xl transition-all flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              {/* 圖示顏色跟隨文字 */}
              <span className="text-[#003366] dark:text-blue-400">{p.icon}</span> 
              {p.title}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">{p.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5 font-medium">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags?.map((t) => (
                <Badge key={t} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-[#003366] dark:text-blue-300 border border-slate-200 dark:border-slate-700">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-[#003366] hover:bg-[#002244] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold border-none shadow-md">
                  {p.cta}
                </Button>
              </a>
            )}
            <a href="#contact" className="w-full">
              <Button variant="outline" className="w-full border-[#003366] text-[#003366] dark:border-blue-400 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">
                詢問此項服務
              </Button>
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
  const [showIntro, setShowIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

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

  const handleVideoEnded = () => {
    setShowIntro(false);
  };

  return (
    // 重點修改：最外層加入 dark:bg-slate-950 dark:text-slate-50
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 relative transition-colors duration-300">
      
      {/* Intro Video (保持暗色) */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              src="/reports/StartMV.mp4"
              className="w-full h-[100dvh] object-contain md:object-cover" 
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnded}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-8 left-8 text-white/80 hover:text-white border border-white/30 p-3 rounded-full transition-colors backdrop-blur-sm z-10"
              aria-label={isMuted ? "開啟聲音" : "關閉聲音"}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setShowIntro(false)}
              className="absolute bottom-8 right-8 text-white/60 hover:text-white text-xs border border-white/30 px-4 py-2 rounded-full transition-colors backdrop-blur-sm z-10"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-50 backdrop-blur bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-lg md:text-xl text-[#003366] dark:text-blue-400 transition-colors">
            <span className="mr-2">匠映分析</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">Jump in Future</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm font-bold text-slate-700 dark:text-slate-300" aria-label="主導覽">
            <a href="#about" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">公司介紹</a>
            <a href="#products" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">產品服務</a>
            <a href="#cases" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">案例展示</a>
            <a href="#contact" className="hover:text-[#003366] dark:hover:text-blue-400 transition-colors">聯絡我們</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact">
              <Button size="sm" className="bg-[#003366] hover:bg-[#002244] dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                快速洽談
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      {/* 修改：Hero 區塊背景 dark:bg-slate-950 */}
      <section id="home" className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
              用 <span className="text-[#003366] dark:text-blue-400">JMP & Python</span> <br />打造可落地的統計解決方案
            </h1>
            <p className="text-slate-700 dark:text-slate-300 mt-4 text-lg font-medium">
              資料清理、統計建模、互動儀表板與自動化報告，一站式代寫與顧問服務。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products">
                <Button size="lg" className="bg-[#003366] hover:bg-[#002244] dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                  <Rocket className="w-5 h-5 mr-2" />
                  查看產品/服務
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="border-2 border-[#003366] text-[#003366] dark:border-blue-400 dark:text-blue-400 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">
                  取得報價
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TECH_STACK.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm">
                  {s}
                </Badge>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="rounded-2xl shadow-xl border-t-4 border-t-[#003366] dark:border-t-blue-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <LineChart className="w-5 h-5 text-[#003366] dark:text-blue-400" /> 即時範例：自動化分析
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">模組化流程確保數據正確性</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">SQL</div>
                    <div className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">自動讀取</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">JSL</div>
                    <div className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">統計建模</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#003366] dark:text-blue-400">HTML</div>
                    <div className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">互動報告</div>
                  </div>
                </div>
                <Separator className="my-4 bg-slate-200 dark:bg-slate-700" />
                <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 font-medium">
                  {["可延展：原生功能串接", "可維護：模組化程式碼", "可交付：一鍵自動化"].map((txt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" /> {txt}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="公司介紹" subtitle="專注於統計分析與資料工程的實作團隊">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "專業技術", desc: "以科學方法為基礎，透過 JMP 生態系將模型導入生產流程。", icon: <Code2 /> },
            { title: "業務範圍", desc: "資料清理、統計建模、A/B 測試、MSA、儀表板與自動化報告。", icon: <BarChart3 /> },
            { title: "產業經驗", desc: "熟悉半導體與製造業品質工程 (SPC、DOE)，兼顧效能與落地。", icon: <LineChart /> },
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#003366] dark:text-blue-400">
                  {item.icon} {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-slate-700 dark:text-slate-300 font-medium">
                {item.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Products */}
      <Section id="products" title="產品與服務" subtitle="以需求為導向的模組化交付">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#003366] dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400">全部</TabsTrigger>
            {TAGS.map((t) => (
              <TabsTrigger key={t} value={t} className="data-[state=active]:bg-[#003366] dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400">{t}</TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4">
            <Input
              placeholder="搜尋關鍵字：例如 MSA、DOE..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="max-w-md border-[#003366]/30 dark:border-blue-400/30 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 placeholder:text-slate-400"
            />
          </div>
          <TabsContent value={activeTab} className="mt-6">
            <ProductGrid items={filtered} />
          </TabsContent>
        </Tabs>
      </Section>

      {/* Cases */}
      <Section id="cases" title="成功案例" subtitle="以可衡量的結果說話">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "UPH 提升 6.8%", sub: "半導體封裝 DOE 參數優化" },
            { title: "消除重複工作", sub: "作業流程 100% 自動化一鍵化" },
            { title: "工時縮短 40%", sub: "報表生成由 2 小時降至 7 分鐘" },
          ].map((c, i) => (
            <Card key={i} className="rounded-2xl border-l-4 border-l-[#003366] dark:border-l-blue-500 bg-white dark:bg-slate-900 shadow-sm border-t border-r border-b border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">{c.title}</CardTitle>
                <CardDescription className="text-[#003366] dark:text-blue-400 font-bold">{c.sub}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                透過客製化 JSL 腳本與資料庫對接，實現精準分析與自動監控。
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="聯絡我們" subtitle="目前採 LINE 一對一洽談，請點擊下方按鈕加入">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="rounded-2xl border-2 border-[#003366]/20 dark:border-blue-400/20 bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">LINE 線上諮詢</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">加入後請說明您的產業與需求</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <a href="https://lin.ee/ngYdJbH" target="_blank" rel="noopener noreferrer">
                  <img src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" alt="LINE" className="h-[44px]" />
                </a>
                <img src="/reports/M_gainfriends_2dbarcodes_GW.png" alt="QR" className="w-24 h-24 border border-slate-300 dark:border-slate-700 rounded-md" />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card className="rounded-2xl bg-[#003366] dark:bg-slate-800 text-white shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-white">為何選擇匠映？</CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90 font-medium">
                <ul className="list-disc pl-5 space-y-2">
                  <li>實戰經驗：不只有程式，更懂統計邏輯</li>
                  <li>維護容易：模組化代碼，並附帶完整說明</li>
                  <li>高安全性：符合企業級 NDA 規範</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-100 dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-[#003366] dark:text-blue-400 text-lg">匠映分析</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Jump in Future</div>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            © {new Date().getFullYear()} 匠映分析. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}