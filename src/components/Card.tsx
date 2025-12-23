import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("ds-card", className)} />;
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("ds-card-pad", className)} />;
}


