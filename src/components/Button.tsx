import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
}) {
  return (
    <button
      {...props}
      className={cn(
        "ds-btn",
        size === "sm" && "ds-btn--sm",
        variant === "primary" && "ds-btn--primary",
        variant === "secondary" && "ds-btn--secondary",
        variant === "ghost" && "ds-btn--ghost",
        variant === "danger" && "ds-btn--danger",
        className
      )}
    >
      {leftIcon}
      {props.children}
    </button>
  );
}

export function IconButton({
  "aria-label": ariaLabel,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { "aria-label": string }) {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={cn("ds-btn ds-btn--ghost ds-icon-btn", className)}
    />
  );
}


