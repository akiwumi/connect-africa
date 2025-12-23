import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";

// Mock project data - in real app this would come from API
const MOCK_PROJECTS = [
  {
    id: 1,
    companyName: "TechVenture Solutions",
    title: "Fintech Mobile Banking Platform",
    industry: "Fintech",
    country: "Ghana",
    description: "Revolutionary mobile banking solution for underserved markets in West Africa. Our platform enables seamless financial transactions and access to credit for millions.",
    fundingGoal: 2500000,
    funded: 1850000,
    backers: 47,
    daysLeft: 12,
    stage: "Series A",
  },
  {
    id: 2,
    companyName: "AgriGrow Kenya",
    title: "Sustainable Agriculture Platform",
    industry: "AgriTech",
    country: "Kenya",
    description: "Connecting smallholder farmers with markets using innovative technology. Empowering farmers with real-time pricing and logistics support.",
    fundingGoal: 1800000,
    funded: 1200000,
    backers: 32,
    daysLeft: 8,
    stage: "Seed",
  },
  {
    id: 3,
    companyName: "SolarPower SA",
    title: "Renewable Energy Solutions",
    industry: "Renewable Energy",
    country: "South Africa",
    description: "Solar solutions for rural communities across Southern Africa. Providing clean, affordable energy to off-grid communities.",
    fundingGoal: 5000000,
    funded: 3200000,
    backers: 89,
    daysLeft: 25,
    stage: "Series A",
  },
  {
    id: 4,
    companyName: "EduLearn Nigeria",
    title: "Online Learning Platform",
    industry: "EdTech",
    country: "Nigeria",
    description: "Affordable online education platform for Nigerian students. Making quality education accessible to all.",
    fundingGoal: 1200000,
    funded: 450000,
    backers: 18,
    daysLeft: 15,
    stage: "Seed",
  },
  {
    id: 5,
    companyName: "HealthConnect Rwanda",
    title: "Telemedicine Platform",
    industry: "HealthTech",
    country: "Rwanda",
    description: "Connecting patients with healthcare providers through mobile technology. Bringing quality healthcare to remote areas.",
    fundingGoal: 2000000,
    funded: 850000,
    backers: 24,
    daysLeft: 20,
    stage: "Seed",
  },
  {
    id: 6,
    companyName: "GreenTransport Ghana",
    title: "Electric Vehicle Fleet",
    industry: "Transportation",
    country: "Ghana",
    description: "Building a sustainable electric vehicle fleet for urban transportation. Reducing carbon emissions in major cities.",
    fundingGoal: 3500000,
    funded: 2100000,
    backers: 56,
    daysLeft: 18,
    stage: "Series A",
  },
];

export function ProjectsPage() {
  const [filters, setFilters] = useState<{ industry?: string; country?: string; q?: string }>({});
  const [filteredProjects, setFilteredProjects] = useState(MOCK_PROJECTS);

  const filterProjects = () => {
    const hash = window.location.hash;
    const hashParts = hash.split("?");
    const params = new URLSearchParams(hashParts[1] || "");
    const filterObj: { industry?: string; country?: string; q?: string } = {};
    if (params.get("industry")) filterObj.industry = params.get("industry")!;
    if (params.get("country")) filterObj.country = params.get("country")!;
    if (params.get("q")) filterObj.q = params.get("q")!;
    setFilters(filterObj);

    let filtered = MOCK_PROJECTS;
    if (filterObj.industry && filterObj.industry !== "All Industries") {
      filtered = filtered.filter((p) => p.industry === filterObj.industry);
    }
    if (filterObj.country) {
      filtered = filtered.filter((p) => p.country === filterObj.country);
    }
    if (filterObj.q) {
      const query = filterObj.q.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.companyName.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    filterProjects();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      filterProjects();
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto", padding: "var(--ds-space-8) var(--ds-space-4)" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--ds-space-6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--ds-space-4)" }}>
            <div>
              <h1
                style={{
                  fontSize: "var(--ds-text-2xl)",
                  fontWeight: 800,
                  marginBottom: "var(--ds-space-2)",
                  color: "var(--ds-text)"
                }}
              >
                {filters.country ? `Projects in ${filters.country}` : "All Projects"}
              </h1>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <Button variant="secondary" onClick={() => (window.location.hash = "#search")}>
              <Icon name="search" style={{ width: 16, height: 16, marginRight: "var(--ds-space-2)" }} />
              Refine Search
            </Button>
          </div>

          {/* Active Filters */}
          {(filters.industry || filters.country || filters.q) && (
            <div style={{ display: "flex", gap: "var(--ds-space-2)", flexWrap: "wrap", marginBottom: "var(--ds-space-4)" }}>
              {filters.industry && (
                <Badge>
                  Industry: {filters.industry}
                  <button
                    onClick={() => {
                      const newFilters = { ...filters };
                      delete newFilters.industry;
                      const params = new URLSearchParams(newFilters as any);
                      window.location.hash = `#projects${params.toString() ? "?" + params.toString() : ""}`;
                    }}
                    style={{
                      marginLeft: "var(--ds-space-2)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.country && (
                <Badge>
                  Country: {filters.country}
                  <button
                    onClick={() => {
                      const newFilters = { ...filters };
                      delete newFilters.country;
                      const params = new URLSearchParams(newFilters as any);
                      window.location.hash = `#projects${params.toString() ? "?" + params.toString() : ""}`;
                    }}
                    style={{
                      marginLeft: "var(--ds-space-2)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.q && (
                <Badge>
                  Search: {filters.q}
                  <button
                    onClick={() => {
                      const newFilters = { ...filters };
                      delete newFilters.q;
                      const params = new URLSearchParams(newFilters as any);
                      window.location.hash = `#projects${params.toString() ? "?" + params.toString() : ""}`;
                    }}
                    style={{
                      marginLeft: "var(--ds-space-2)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Projects Grid - Kickstarter Style */}
        {filteredProjects.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "var(--ds-space-6)",
            }}
          >
            {filteredProjects.map((project) => {
              const progress = (project.funded / project.fundingGoal) * 100;
              return (
                <Card
                  key={project.id}
                  style={{
                    cursor: "pointer",
                    transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
                    display: "flex",
                    flexDirection: "column",
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
                    // In real app, navigate to project detail page
                    alert(`Viewing details for: ${project.title}`);
                  }}
                >
                  {/* Project Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      background: "linear-gradient(135deg, var(--ds-primary-soft) 0%, var(--ds-surface-3) 100%)",
                      borderRadius: "var(--ds-radius-md) var(--ds-radius-md) 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--ds-text-muted)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Icon name="briefcase" style={{ width: 64, height: 64, opacity: 0.3 }} />
                    <Badge
                      style={{
                        position: "absolute",
                        top: "var(--ds-space-3)",
                        right: "var(--ds-space-3)",
                      }}
                    >
                      {project.industry}
                    </Badge>
                  </div>

                  <CardBody style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Project Info */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "var(--ds-text-lg)",
                          fontWeight: 700,
                          marginBottom: "var(--ds-space-2)",
                          color: "var(--ds-text)",
                          lineHeight: "var(--ds-leading-tight)",
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "var(--ds-text-sm)",
                          color: "var(--ds-text-muted)",
                          marginBottom: "var(--ds-space-3)",
                        }}
                      >
                        {project.companyName} • {project.country}
                      </p>
                      <p
                        style={{
                          fontSize: "var(--ds-text-sm)",
                          color: "var(--ds-text)",
                          marginBottom: "var(--ds-space-4)",
                          lineHeight: "var(--ds-leading-normal)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Funding Progress */}
                    <div style={{ marginBottom: "var(--ds-space-4)" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: "var(--ds-space-2)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "var(--ds-text-xl)",
                            fontWeight: 700,
                            color: "var(--ds-primary)",
                          }}
                        >
                          {formatCurrency(project.funded)}
                        </span>
                        <span
                          style={{
                            fontSize: "var(--ds-text-sm)",
                            color: "var(--ds-text-muted)",
                          }}
                        >
                          of {formatCurrency(project.fundingGoal)}
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "10px",
                          background: "var(--ds-surface-2)",
                          borderRadius: "var(--ds-radius-pill)",
                          overflow: "hidden",
                          marginBottom: "var(--ds-space-2)",
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "var(--ds-text-xs)",
                          color: "var(--ds-text-muted)",
                        }}
                      >
                        <span>{project.backers} backers</span>
                        <span>{project.daysLeft} days left</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button variant="primary" style={{ width: "100%" }}>
                      View Project
                    </Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardBody style={{ textAlign: "center", padding: "var(--ds-space-12)" }}>
              <Icon name="briefcase" style={{ width: 64, height: 64, opacity: 0.3, margin: "0 auto var(--ds-space-4)" }} />
              <h3 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 600, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                No projects found
              </h3>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-4)" }}>
                Try adjusting your search filters
              </p>
              <Button variant="primary" onClick={() => (window.location.hash = "#search")}>
                Search Again
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
