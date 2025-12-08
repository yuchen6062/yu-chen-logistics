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
  "JMP",
  "JSL",
  "Graph Builder",
  "Control Chart Builder",
  "DOE",
  "MSA",
  "SPC",
  "Prediction Profiler",
  "Fit Model",
  "Partition",
  "Bootstrap",
  "Application Builder",
  "Add-in",
  "JMP Query",
  "Data Table",
  "Column Formula",
  "Project",
  "Scripting Index",
] as const;

const STEPS = [
  { title: "需求釐清", desc: "30–60 分鐘會談，界定資料、目標與交付物格式。" },
  { title: "規劃提案", desc: "送出時程、里程碑、預算與風險控管，雙方確認。" },
  { title: "開發驗證", desc: "每週短衝 (sprint) 回報，提供可運行的中間成果。" },
  { title: "交付與移轉", desc: "提供文件、原始碼、測試與部署指引，完成驗收。" },
] as const;

const FAQ = [
  { q: "是否能簽保密協定 (NDA)？", a: "可以。我們常態性配合客戶的 NDA 與資訊安全規範。" },
  { q: "費用如何估算？", a: "以需求複雜度與功能數估算，提供固定報價或其長期合作模式。" },
  { q: "交付物包含什麼？", a: "包含可執行的程式碼、說明文件與示範報告，必要時附部署腳本。" },
  { q: "還需其他套件費用嗎？", a: "完全依靠 JMP 自身統計功能為主，輔助用 Python 功能皆使用免費套件。" },
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
        <Card key={p.id} className="rounded-2xl hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {p.icon} {p.title}
            </CardTitle>
            <CardDescription>{p.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags?.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  {p.cta}
                </Button>
              </a>
            ) : (
              <Button variant="outline" size="sm">
                {p.cta}
              </Button>
            )}
            <a href="#contact" aria-label={`詢問 ${p.title}`}>
              <Button size="sm">詢問此項</Button>
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
  // 1. 控制影片播放狀態
  const [showIntro, setShowIntro] = useState(true);

  // 2. 控制聲音狀態 (預設必須是 true 靜音，否則無法自動播放)
  const [isMuted, setIsMuted] = useState(true);

  // 原本的過濾器狀態
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

  // 影片播放結束時觸發
  const handleVideoEnded = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      
      {/* -------------------- */}
      {/* Intro Video Overlay  */}
      {/* -------------------- */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* CSS 修正重點：
               1. h-[100dvh]: 解決手機瀏覽器網址列導致的高度問題 (Dynamic Viewport Height)
               2. object-contain: 手機版時，完整顯示影片內容 (會有黑邊，但不會被裁切)
               3. md:object-cover: 電腦/平板版時，轉為全螢幕填滿模式
            */}
            <video
              src="/reports/StartMV.mp4"
              className="w-full h-[100dvh] object-contain md:object-cover" 
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnded}
            />
            
            {/* 聲音切換按鈕 */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 防止誤觸
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-8 left-8 text-white/80 hover:text-white border border-white/30 p-3 rounded-full transition-colors backdrop-blur-sm z-10"
              aria-label={isMuted ? "開啟聲音" : "關閉聲音"}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            {/* 跳過按鈕 */}
            <button
              onClick={() => setShowIntro(false)}
              className="absolute bottom-8 right-8 text-white/60 hover:text-white text-xs border border-white/30 px-4 py-2 rounded-full transition-colors backdrop-blur-sm z-10"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------- */}
      {/* Main Website Content */}
      {/* -------------------- */}
      
      {/* Skip link for a11y */}
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50">
        跳到主要內容
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-lg md:text-xl" aria-label="匠映分析 首頁">
            <span className="mr-2">匠映分析</span>
            <span className="text-xs text-muted-foreground font-medium">Jump in Future</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm" aria-label="主導覽">
            <a href="#about" className="hover:underline">公司介紹</a>
            <a href="#products" className="hover:underline">產品/服務</a>
            <a href="#cases" className="hover:underline">案例</a>
            <a href="#process" className="hover:underline">合作流程</a>
            <a href="#contact" className="hover:underline">聯絡我們</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex">
              <Button size="sm">
                <Mail className="w-4 h-4 mr-2" />
                快速洽談
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              用 <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">JMP & Python</span> 打造可落地的統計解決方案
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              資料清理、統計建模、互動儀表板與自動化報告，一站式代寫與顧問服務。
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#products">
                <Button size="lg">
                  <Rocket className="w-5 h-5 mr-2" />
                  查看產品/服務
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg">
                  取得報價
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TECH_STACK.map((s) => (
                <Badge key={s as string} variant="secondary" className="rounded-full">
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
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" /> 即時範例：高度互動性分析看板
                </CardTitle>
                <CardDescription>簡易範例包含所有元素</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">資料庫 - SQL</div>
                    <div className="text-xs text-muted-foreground">數據分析的核心</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">統計預測</div>
                    <div className="text-xs text-muted-foreground">建立可解釋的模型</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">互動報表</div>
                    <div className="text-xs text-muted-foreground">數據與視圖雙向聯動</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5" /> 可延展：利用 JMP 原生功能快速完成其他分析
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5" /> 可維護：模組化函式、測試與型別標註
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5" /> 可交付：一鍵輸出 HTML 報告
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="公司介紹" subtitle="專注於統計分析與資料工程的實作團隊">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5" /> 專業技術
              </CardTitle>
              <CardDescription>統計方法 + JMP 工程落地</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              以科學方法與嚴謹實驗設計為基礎，透過 JMP 生態系將模型真正導入流程並監控效能。
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> 業務範圍
              </CardTitle>
              <CardDescription>從資料取得到報告交付</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              提供資料清理、統計建模、A/B 測試、MSA、儀表板、與持續整合的自動化報告。
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" /> 產業經驗
              </CardTitle>
              <CardDescription>製造、半導體、電商、醫療</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              熟悉品質工程 (SPC、DOE、MSA) 與數位產品實驗，兼顧合規與落地效能。
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Products & services */}
      <Section id="products" title="產品與服務" subtitle="以需求為導向的模組化交付">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>全部</TabsTrigger>
            {TAGS.map((t) => (
              <TabsTrigger key={t} value={t} onClick={() => setActiveTab(t)}>{t}</TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder="關鍵字過濾：例如 MSA、DOE、Graph Builder…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>製程 UPH 提升 6.8%</CardTitle>
              <CardDescription>半導體封裝 DOE + 模擬 + 機器學習</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              使用標準統計手法找到區域最佳參數解，透過自動化分析報表監控結果。
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>減少重複性工作</CardTitle>
              <CardDescription>作業流程一鍵化</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              完全消除手動資料整理與分析，完整客製化符合企業需求。
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>檢測時間縮短 40%</CardTitle>
              <CardDescription>自動化報告 | Machine Log</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              將人工彙整流程改為 API 與批次任務，報表生成由 2 小時降至 7 分鐘。
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Process */}
      <Section id="process" title="合作流程" subtitle="透明里程碑，敏捷交付">
        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">{i + 1}</Badge>
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
        subtitle="目前採 LINE 一對一洽談，如需服務請加好友並留言您的需求"
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>透過 LINE 聯絡匠映分析</CardTitle>
              <CardDescription>加入好友後，請簡單說明您的產業、需求與時程</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                建議先提供：目前使用工具（JMP / Excel / 其他）、資料類型（製程、量測、實驗）、以及希望解決的問題，我們會回覆合適的做法與合作模式。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="https://lin.ee/ngYdJbH"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="透過 LINE 聯絡匠映分析"
                >
                  <img
                    src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                    alt="加入匠映分析 LINE 好友"
                    height={36}
                    className="h-[36px] w-auto"
                  />
                </a>
                <img
                  src="/reports/M_gainfriends_2dbarcodes_GW.png"
                  alt="匠映分析 LINE QR Code"
                  className="w-32 h-32 border rounded-md"
                />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>為何選擇我們？</CardTitle>
                <CardDescription>工程 × 統計 × 程式語言</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                  <li>以商業指標為導向的統計解法，避免紙上談兵</li>
                  <li>模組化代碼、測試與文件齊備，易於維護</li>
                  <li>尊重安全與隱私</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>常見問題</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {FAQ.map((f, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
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
      <footer className="border-t py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-extrabold">匠映分析</div>
            <div className="text-sm text-muted-foreground">以 JMP 完成統計代寫與資料產品落地</div>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 匠映分析. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}