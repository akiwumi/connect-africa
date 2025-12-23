import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export function Input({
  label,
  leftIcon,
  className,
  inputClassName,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: ReactNode;
  inputClassName?: string;
}) {
  return (
    <label className={cn("ds-input-wrap", className)}>
      {label ? <span className="ds-label">{label}</span> : null}
      <span className="ds-input-row">
        {leftIcon ? <span className="ds-input-icon">{leftIcon}</span> : null}
        <input {...props} className={cn("ds-input", inputClassName)} />
      </span>
    </label>
  );
}


