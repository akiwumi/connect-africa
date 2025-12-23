import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", hash: "#home" },
    { label: "Feed", hash: "#feed" },
    { label: "Search", hash: "#search" },
    { label: "Register", hash: "#register" },
    { label: "Profile", hash: "#profile" },
  ];

  const handleNavClick = (hash: string) => {
    window.location.hash = hash;
    setMenuOpen(false);
  };

  return (
    <header className="ds-navbar" style={{ position: "relative" }}>
      <div className="ds-container ds-navbar-inner">
        {/* Logo - centered on mobile/tablet */}
        <a 
          className="ds-brand ds-brand-mobile-center" 
          href="#home" 
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavClick("#home"); 
          }}
        >
          <img 
            src="/images/LinkAfica-Master-Logo.png" 
            alt="LinkAfrica" 
            style={{ height: "32px", width: "auto" }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="ds-nav-actions ds-nav-desktop" aria-label="Main navigation" style={{ gap: "var(--ds-space-2)" }}>
          {navLinks.map((link) => (
            <a 
              key={link.hash}
              href={link.hash} 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick(link.hash); 
              }}
              style={{ 
                color: "var(--ds-text)", 
                textDecoration: "none", 
                fontSize: "var(--ds-text-sm)", 
                fontWeight: 500 
              }}
            >
              {link.label}
            </a>
          ))}
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handleNavClick("#login")}
          >
            Login
          </Button>
        </nav>

        {/* Hamburger Menu Button - visible on mobile/tablet */}
        <button
          ref={hamburgerRef}
          className="ds-nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--ds-space-2)",
            color: "var(--ds-text)",
            flexDirection: "column",
            gap: "4px",
            width: "32px",
            height: "32px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: "20px",
              height: "2px",
              background: "var(--ds-text)",
              transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              width: "20px",
              height: "2px",
              background: "var(--ds-text)",
              transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "20px",
              height: "2px",
              background: "var(--ds-text)",
              transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>

      </div>

      {/* Mobile/Tablet Navigation Menu - outside container for full-width */}
      {menuOpen && (
        <nav 
          ref={menuRef}
          className="ds-nav-mobile" 
          aria-label="Mobile navigation"
          style={{
            background: "var(--ds-surface)",
            borderBottom: "1px solid var(--ds-border)",
            boxShadow: "var(--ds-shadow-2)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            padding: "var(--ds-space-4)",
            gap: "var(--ds-space-2)",
            maxHeight: "calc(100vh - var(--ds-navbar-h))",
            overflowY: "auto",
          }}
        >
          <div className="ds-container" style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-2)" }}>
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.hash);
                }}
                style={{
                  color: "var(--ds-text)",
                  textDecoration: "none",
                  fontSize: "var(--ds-text-md)",
                  fontWeight: 500,
                  padding: "var(--ds-space-3)",
                  borderRadius: "var(--ds-radius-sm)",
                  transition: "background var(--ds-dur-2) var(--ds-ease-standard)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--ds-surface-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ padding: "var(--ds-space-3)" }}>
              <Button 
                variant="secondary" 
                size="md"
                onClick={() => handleNavClick("#login")}
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
