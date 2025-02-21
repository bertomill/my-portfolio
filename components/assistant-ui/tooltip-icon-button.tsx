"use client";

import { forwardRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export type TooltipIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  variant?: "ghost" | "outline" | "default";
};

export function TooltipIconButton({
  label,
  children,
  side = "top",
  sideOffset = 4,
  className,
  variant = "ghost",
  ...props
}: TooltipIconButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            className={cn(
              "h-9 w-9 p-0",
              className
            )}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

TooltipIconButton.displayName = "TooltipIconButton";
