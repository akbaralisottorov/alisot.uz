import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[24px] text-sm font-semibold transition-all duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97] hover:-translate-y-[1.5px] hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-white shadow-sm shadow-gold/10 hover:bg-gold-hover hover:-translate-y-[1px] hover:shadow-md hover:shadow-gold/25",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border/80 bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-gold hover:border-gold/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground",
        link: "text-gold hover:text-gold-hover underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-13 rounded-3xl px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
