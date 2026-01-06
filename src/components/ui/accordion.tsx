"use client";
import * as React from "react";

// 1. 主 Context：管理目前哪個 Item 被打開
type AccordionCtxType = {
  open: string | null;
  setOpen: (v: string | null) => void;
  collapsible?: boolean;
};
const AccordionCtx = React.createContext<AccordionCtxType | null>(null);

// 2. 子 Context：讓 Item 告訴內部的 Trigger 和 Content 它的 value 是什麼
const AccordionItemCtx = React.createContext<string | null>(null);

export function Accordion({
  type = "single",
  collapsible = false,
  className = "",
  children,
}: {
  type?: "single";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <AccordionCtx.Provider value={{ open, setOpen, collapsible }}>
      <div className={className}>{children}</div>
    </AccordionCtx.Provider>
  );
}

// 修正重點：加入 className 屬性，並建立 Item Context
export function AccordionItem({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string; // 修正：加入這裡
  children: React.ReactNode;
}) {
  return (
    <AccordionItemCtx.Provider value={value}>
      <div data-value={value} className={`border-b ${className}`}>
        {children}
      </div>
    </AccordionItemCtx.Provider>
  );
}

export function AccordionTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionCtx);
  const itemValue = React.useContext(AccordionItemCtx); // 直接從 Context 拿值，不依賴 DOM

  if (!ctx || !itemValue) return null;

  const isOpen = ctx.open === itemValue;

  return (
    <button
      onClick={() => {
        // 如果允許折疊且目前是打開的，就關閉(null)；否則設為目前的值
        ctx.setOpen(isOpen && ctx.collapsible ? null : itemValue);
      }}
      className={`w-full text-left py-3 font-medium transition-all ${className} ${
        isOpen ? "underline" : ""
      }`} // 可選：這裡可以加箭頭旋轉動畫
    >
      {children}
    </button>
  );
}

export function AccordionContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionCtx);
  const itemValue = React.useContext(AccordionItemCtx); // 直接從 Context 拿值

  if (!ctx || !itemValue) return null;

  const isOpen = ctx.open === itemValue;

  // 如果沒打開，回傳 null (不渲染)，或是用 CSS hidden 隱藏
  if (!isOpen) return null;

  return (
    <div className={`pb-3 text-sm text-muted-foreground ${className}`}>
      {children}
    </div>
  );
}