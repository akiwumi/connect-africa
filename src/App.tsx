import { useState, useEffect } from "react";
import { LandingPage } from "./pages/LandingPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { PaymentPage } from "./pages/PaymentPage";
import { SearchPage } from "./pages/SearchPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { HomeFeedPage } from "./pages/HomeFeedPage";
import { BottomNav } from "./components/BottomNav";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Check URL hash on mount
    const hash = window.location.hash.slice(1);
    return hash || "home";
  });

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      // Extract page name before query params
      const pageName = hash.split("?")[0] || "home";
      setCurrentPage(pageName || "home");
    };

    // Set initial page
    const hash = window.location.hash.slice(1);
    const pageName = hash.split("?")[0] || "home";
    setCurrentPage(pageName || "home");

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    // Check if it's a profile route (with or without email ID)
    if (currentPage.startsWith("profile")) {
      return <PublicProfilePage />;
    }
    
    switch (currentPage) {
      case "register":
        return <RegistrationPage />;
      case "payment":
        return <PaymentPage />;
      case "dashboard":
        return <ProfilePage />; // Dashboard is separate from public profile
      case "login":
        return <LoginPage />;
      case "feed":
        return <HomeFeedPage />;
      case "search":
        return <SearchPage />;
      case "projects":
        return <ProjectsPage />;
      case "home":
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      {renderPage()}
      <BottomNav />
    </>
  );
}


