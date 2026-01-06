import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // 如果沒有安裝 radix-ui，可以移除這行並把 Slot 改成 button
import { cva, type VariantProps } from "class-variance-authority" // 建議安裝: npm i class-variance-authority
import { cn } from "@/lib/utils" // 確保有這個工具函式，如果沒有，下面有簡易版

// 簡化版 Button (不需要額外套件)
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground"
    }
    const combinedClassName = `${base} ${variants[variant]} ${className || ""}`
    
    return (
      <button className={combinedClassName} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"
export { Button }