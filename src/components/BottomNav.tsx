import { useEffect, useState } from "react";
import { Icon } from "./Icon";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  hash: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home", hash: "#home" },
  { id: "feed", label: "Feed", icon: "users", hash: "#feed" },
  { id: "search", label: "Search", icon: "search", hash: "#search" },
  { id: "profile", label: "Profile", icon: "users", hash: "#profile" },
  { id: "menu", label: "More", icon: "ellipsis", hash: "#menu" },
];

export function BottomNav() {
  const [activeItem, setActiveItem] = useState("home");

  // Update active item based on current hash
  useEffect(() => {
    const updateActiveItem = () => {
      const hash = window.location.hash.slice(1) || "home";
      const pageName = hash.split("?")[0];
      
      // Map page names to nav items
      const itemMap: Record<string, string> = {
        home: "home",
        feed: "feed",
        search: "search",
        projects: "search", // Projects page maps to search
        profile: "profile",
        register: "menu",
        login: "menu",
        payment: "menu",
        menu: "menu",
      };
      
      setActiveItem(itemMap[pageName] || "home");
    };

    updateActiveItem();
    window.addEventListener("hashchange", updateActiveItem);
    return () => window.removeEventListener("hashchange", updateActiveItem);
  }, []);

  const handleNavClick = (hash: string, id: string) => {
    if (id === "menu") {
      // For "More" menu, could open a drawer or show menu options
      // For now, just navigate to profile as a placeholder
      window.location.hash = "#profile";
      return;
    }
    window.location.hash = hash;
    setActiveItem(id);
  };

  return (
    <nav
      className="ds-bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--ds-surface)",
        borderTop: "1px solid var(--ds-border)",
        display: "none", // Hidden by default, shown via CSS on mobile/tablet
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)", // Support for iPhone notch
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: "100%",
          margin: "0 auto",
          padding: "var(--ds-space-2) var(--ds-space-1)",
          height: "56px",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.hash, item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "var(--ds-space-1)",
                color: isActive ? "var(--ds-primary)" : "var(--ds-text-muted)",
                minWidth: "60px",
                transition: "color var(--ds-dur-2) var(--ds-ease-standard)",
                position: "relative",
              }}
              aria-label={item.label}
            >
              <Icon
                name={item.icon as any}
                style={{
                  width: 24,
                  height: 24,
                  transition: "transform var(--ds-dur-2) var(--ds-ease-standard)",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: isActive ? 600 : 400,
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "var(--ds-radius-pill)",
                    background: "var(--ds-primary)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

