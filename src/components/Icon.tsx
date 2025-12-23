import type { SVGProps } from "react";

type IconName =
  | "search"
  | "home"
  | "users"
  | "briefcase"
  | "message"
  | "bell"
  | "ellipsis"
  | "plus"
  | "user-plus"
  | "shield-check"
  | "check"
  | "play";

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  } as const;

  switch (name) {
    case "search":
      return (
        <svg {...common} {...props}>
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16.5 16.5 21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "home":
      return (
        <svg {...common} {...props}>
          <path
            d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20v-9.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 21.5v-6A1.5 1.5 0 0 1 11 14h2a1.5 1.5 0 0 1 1.5 1.5v6"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "users":
      return (
        <svg {...common} {...props}>
          <path
            d="M16 21v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M22 21v-1a4 4 0 0 0-3-3.87"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 4.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common} {...props}>
          <path
            d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 12h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "message":
      return (
        <svg {...common} {...props}>
          <path
            d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} {...props}>
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M10 21a2 2 0 0 0 4 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "ellipsis":
      return (
        <svg {...common} {...props}>
          <path
            d="M6 12h.01M12 12h.01M18 12h.01"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "plus":
      return (
        <svg {...common} {...props}>
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "user-plus":
      return (
        <svg {...common} {...props}>
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M19 8v6M22 11h-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...common} {...props}>
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg {...common} {...props}>
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "play":
      return (
        <svg {...common} {...props}>
          <path
            d="M8 5v14l11-7L8 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="currentColor"
          />
        </svg>
      );
  }
}


