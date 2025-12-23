import type { SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export function Select({
  label,
  className,
  selectClassName,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  selectClassName?: string;
}) {
  return (
    <label className={cn("ds-input-wrap", className)}>
      {label ? <span className="ds-label">{label}</span> : null}
      <select {...props} className={cn("ds-input", selectClassName)} />
    </label>
  );
}

