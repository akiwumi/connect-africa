import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      {...props}
      className={cn(
        "ds-badge",
        tone === "primary" && "ds-badge--primary",
        tone === "success" && "ds-badge--success",
        tone === "warning" && "ds-badge--warning",
        tone === "danger" && "ds-badge--danger",
        className
      )}
    />
  );
}


