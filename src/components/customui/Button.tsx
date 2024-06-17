import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "bg-foreground text-background pt-[10px] pb-2 px-3 rounded-lg inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/95 under-shadow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-100 dark:hover:bg-red-600 under-shadow-destructive",
        disabled:
          "bg-foreground text-background hover:bg-foreground/95 cursor-not-allowed",
        outline:
          "bg-transparent text-foreground border border-[--border-x] hover:bg-foreground/5",
        subtle:
          "bg-[#0a0a0a]/5 text-foreground hover:bg-[#0a0a0a]/15 dark:bg-foreground/5",
        ghost:
          "bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-neutral-900 dark:text-neutral-300 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 pt-[8px] pb-2 px-4",
        sm: "h-9 px-2 rounded-lg",
        lg: "h-11 px-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
