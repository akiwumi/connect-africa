import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

type AvatarSize = "sm" | "md" | "lg";

export function Avatar({
  size = "md",
  initials,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { size?: AvatarSize; initials: string }) {
  return (
    <span
      {...props}
      className={cn(
        "ds-avatar",
        size === "sm" && "ds-avatar--sm",
        size === "md" && "ds-avatar--md",
        size === "lg" && "ds-avatar--lg",
        className
      )}
    >
      {initials}
    </span>
  );
}


