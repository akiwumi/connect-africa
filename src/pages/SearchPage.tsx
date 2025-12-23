import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";

// All African countries
const AFRICAN_COUNTRIES = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
  "Congo", "Côte d'Ivoire", "Djibouti", "Egypt", "Equatorial Guinea",
  "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
  "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique",
  "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe",
  "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
  "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda",
  "Zambia", "Zimbabwe"
];

const INDUSTRY_CATEGORIES = [
  "All Industries",
  "Technology",
  "Financial Services",
  "Healthcare",
  "Agriculture",
  "Education",
  "Energy",
  "Real Estate",
  "Manufacturing",
  "Retail & E-commerce",
  "Transportation & Logistics",
  "Media & Entertainment",
  "Food & Beverage",
  "Telecommunications",
  "Tourism & Hospitality",
  "Renewable Energy",
  "Fintech",
  "EdTech",
  "HealthTech",
  "AgriTech",
  "Other",
];

// Popular categories for quick access
const POPULAR_CATEGORIES = [
  { name: "Fintech", icon: "briefcase", count: 124 },
  { name: "AgriTech", icon: "briefcase", count: 89 },
  { name: "EdTech", icon: "briefcase", count: 67 },
  { name: "Renewable Energy", icon: "briefcase", count: 145 },
  { name: "HealthTech", icon: "briefcase", count: 78 },
  { name: "E-commerce", icon: "briefcase", count: 92 },
];

// Featured projects for hero section
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Fintech Mobile Banking Platform",
    company: "TechVenture Solutions",
    country: "Ghana",
    industry: "Fintech",
    fundingGoal: 2500000,
    funded: 1850000,
    backers: 47,
    daysLeft: 12,
    image: "/images/collaborative-discussion.jpg", // Can use same image or different project images
  },
  {
    id: 2,
    title: "Sustainable Agriculture Platform",
    company: "AgriGrow Kenya",
    country: "Kenya",
    industry: "AgriTech",
    fundingGoal: 1800000,
    funded: 1200000,
    backers: 32,
    daysLeft: 8,
    image: "/images/collaborative-discussion.jpg", // Can use same image or different project images
  },
];

export function SearchPage() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [searchFilters, setSearchFilters] = useState({
    industry: "All Industries",
    country: "",
    searchQuery: "",
  });

  const handleImageError = (projectId: number) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchFilters.industry && searchFilters.industry !== "All Industries") {
      params.set("industry", searchFilters.industry);
    }
    if (searchFilters.country) {
      params.set("country", searchFilters.country);
    }
    if (searchFilters.searchQuery) {
      params.set("q", searchFilters.searchQuery);
    }
    window.location.hash = `#projects${params.toString() ? "?" + params.toString() : ""}`;
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      {/* Hero Section - Kickstarter Style */}
      <section
        className="search-hero-section"
        style={{
          position: "relative",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "var(--ds-space-16) var(--ds-space-4) var(--ds-space-12)",
          textAlign: "center",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Hero Image Background - Full Width */}
        <div
          className="search-hero-background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            backgroundImage: "url('/images/search-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
        {/* Overlay for better text readability - Lightened by 50% */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            background: "linear-gradient(135deg, rgba(0, 123, 255, 0.375) 0%, rgba(0, 82, 204, 0.375) 100%)",
            zIndex: 2,
          }}
        />
        {/* Fallback gradient if image fails to load - behind image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            background: "linear-gradient(135deg, var(--ds-primary) 0%, var(--ds-primary-dark) 100%)",
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto", position: "relative", zIndex: 3, width: "100%" }}>
            <h1
              className="search-hero-title"
              style={{
                fontSize: "var(--ds-text-3xl)",
                fontWeight: 800,
                marginBottom: "var(--ds-space-4)",
                lineHeight: "var(--ds-leading-tight)",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              Discover African Investment Opportunities
            </h1>
            <p
              className="search-hero-subtitle"
              style={{
                fontSize: "var(--ds-text-lg)",
                marginBottom: "var(--ds-space-8)",
                opacity: 0.95,
                maxWidth: "600px",
                margin: "0 auto var(--ds-space-8)",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Connect with vetted entrepreneurs and companies seeking investment across Africa
            </p>

          {/* Search Bar */}
          <Card className="search-hero-card" style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 4 }}>
            <CardBody>
              <form onSubmit={handleSearch} style={{ display: "grid", gap: "var(--ds-space-4)" }}>
                <Input
                  name="searchQuery"
                  value={searchFilters.searchQuery}
                  onChange={handleFilterChange}
                  placeholder="Search projects, companies, or industries..."
                  leftIcon={<Icon name="search" />}
                  className="search-input-mobile"
                  style={{ fontSize: "var(--ds-text-md)" }}
                />

                <div className="search-filters-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--ds-space-4)" }}>
                  <select
                    name="industry"
                    value={searchFilters.industry}
                    onChange={handleFilterChange}
                    className="ds-select search-select-mobile"
                    style={{ 
                      padding: "var(--ds-space-3) var(--ds-space-4)",
                      fontSize: "var(--ds-text-sm)",
                      width: "100%",
                    }}
                  >
                    {INDUSTRY_CATEGORIES.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>

                  <select
                    name="country"
                    value={searchFilters.country}
                    onChange={handleFilterChange}
                    className="ds-select search-select-mobile"
                    style={{ 
                      padding: "var(--ds-space-3) var(--ds-space-4)",
                      fontSize: "var(--ds-text-sm)",
                      width: "100%",
                    }}
                  >
                    <option value="">All Countries</option>
                    {AFRICAN_COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" variant="primary" size="md" className="search-button-mobile" style={{ width: "100%", fontSize: "var(--ds-text-md)", padding: "var(--ds-space-4)" }}>
                  Search Projects
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>

      <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto", padding: "var(--ds-space-8) var(--ds-space-4)" }}>
        {/* Popular Categories */}
        <section style={{ marginBottom: "var(--ds-space-12)" }}>
          <h2
            style={{
              fontSize: "var(--ds-text-xl)",
              fontWeight: 700,
              marginBottom: "var(--ds-space-6)",
              color: "var(--ds-text)",
            }}
          >
            Popular Categories
          </h2>
          <div
            className="popular-categories-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "var(--ds-space-4)",
            }}
          >
            {POPULAR_CATEGORIES.map((category) => (
              <Card
                key={category.name}
                style={{
                  cursor: "pointer",
                  transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--ds-shadow-3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--ds-shadow-1)";
                }}
                onClick={() => {
                  setSearchFilters({ ...searchFilters, industry: category.name });
                  const params = new URLSearchParams();
                  params.set("industry", category.name);
                  window.location.hash = `#projects?${params.toString()}`;
                }}
              >
                <CardBody style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "var(--ds-radius-md)",
                      background: "var(--ds-primary-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto var(--ds-space-3)",
                    }}
                  >
                    <Icon name={category.icon as any} style={{ width: 28, height: 28, color: "var(--ds-primary)" }} />
                  </div>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-1)", color: "var(--ds-text)" }}>
                    {category.name}
                  </h3>
                  <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                    {category.count} projects
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--ds-space-6)" }}>
            <h2
              style={{
                fontSize: "var(--ds-text-xl)",
                fontWeight: 700,
                color: "var(--ds-text)",
              }}
            >
              Featured Projects
            </h2>
            <Button variant="ghost" onClick={() => window.location.hash = "#projects"}>
              View All
            </Button>
          </div>
                  <div
                    className="featured-projects-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: "var(--ds-space-6)",
                    }}
                  >
            {FEATURED_PROJECTS.map((project) => {
              const progress = (project.funded / project.fundingGoal) * 100;
              const imageError = imageErrors[project.id];
              return (
                <Card
                  key={project.id}
                  style={{
                    cursor: "pointer",
                    transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--ds-shadow-3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--ds-shadow-1)";
                  }}
                  onClick={() => window.location.hash = `#projects?q=${encodeURIComponent(project.title)}`}
                >
                  <CardBody style={{ padding: 0, overflow: "hidden" }}>
                    {/* Project Image */}
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        position: "relative",
                        background: imageError
                          ? "linear-gradient(135deg, var(--ds-primary-soft) 0%, var(--ds-surface-3) 100%)"
                          : "var(--ds-surface-3)",
                        overflow: "hidden",
                      }}
                    >
                      {imageError ? (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--ds-text-muted)",
                          }}
                        >
                          <Icon name="briefcase" style={{ width: 64, height: 64, opacity: 0.3 }} />
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          onError={() => handleImageError(project.id)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ padding: "var(--ds-space-4)" }}>
                      <div style={{ marginBottom: "var(--ds-space-3)" }}>
                        <Badge style={{ marginBottom: "var(--ds-space-2)" }}>{project.industry}</Badge>
                        <h3 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-1)", color: "var(--ds-text)" }}>
                          {project.title}
                        </h3>
                        <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                          {project.company} • {project.country}
                        </p>
                      </div>
                      <div style={{ marginBottom: "var(--ds-space-3)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--ds-space-2)" }}>
                          <span style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-primary)" }}>
                            €{project.funded.toLocaleString()}
                          </span>
                          <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
                            of €{project.fundingGoal.toLocaleString()}
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            background: "var(--ds-surface-2)",
                            borderRadius: "var(--ds-radius-pill)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${progress}%`,
                              height: "100%",
                              background: "var(--ds-primary)",
                              transition: "width var(--ds-dur-3) var(--ds-ease-standard)",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
                        <span>{project.backers} backers</span>
                        <span>{project.daysLeft} days left</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
