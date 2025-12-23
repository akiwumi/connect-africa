import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";

export function HomeFeedPage() {
  const [postText, setPostText] = useState("");

  // Mock feed posts
  const posts = [
    {
      id: 1,
      author: "Global Ventures Fund",
      authorTitle: "Investment Fund",
      authorAvatar: "GV",
      timeAgo: "2h",
      content: "We're excited to announce our latest investment in TechVenture Solutions, a leading fintech company in Ghana. This partnership will help expand financial inclusion across West Africa.",
      image: null,
      likes: 24,
      comments: 8,
      shares: 5,
    },
    {
      id: 2,
      author: "Impact Capital",
      authorTitle: "Investment Fund",
      authorAvatar: "IC",
      timeAgo: "5h",
      content: "Looking for sustainable agriculture startups in East Africa. If you're building solutions for smallholder farmers, we'd love to connect!",
      image: null,
      likes: 18,
      comments: 12,
      shares: 3,
    },
    {
      id: 3,
      author: "TechVenture Solutions",
      authorTitle: "Company",
      authorAvatar: "TV",
      timeAgo: "1d",
      content: "Thrilled to share that we've reached 500,000 active users! Thank you to all our investors and partners who believed in our vision.",
      image: null,
      likes: 45,
      comments: 15,
      shares: 22,
    },
    {
      id: 4,
      author: "Sarah Johnson",
      authorTitle: "Individual Investor",
      authorAvatar: "SJ",
      timeAgo: "2d",
      content: "Just returned from an amazing trip to Nairobi where I met with several promising startups. The innovation happening in Africa is incredible!",
      image: null,
      likes: 32,
      comments: 7,
      shares: 4,
    },
  ];

  // Mock advertisements
  const advertisements = [
    {
      id: 1,
      title: "Premium Business Services",
      description: "Get verified business credentials and boost your profile visibility. Premium members get 3x more investor views.",
      cta: "Upgrade to Premium",
      type: "premium",
    },
    {
      id: 2,
      title: "Need Legal Support?",
      description: "Connect with our network of legal experts specializing in African business law and investment structures.",
      cta: "Find Legal Help",
      type: "service",
    },
    {
      id: 3,
      title: "Accounting Services",
      description: "Professional accounting and financial reporting services tailored for startups seeking investment.",
      cta: "Learn More",
      type: "service",
    },
  ];

  // Mock news articles
  const newsArticles = [
    {
      id: 1,
      title: "African Tech Startups Raise Record $2.1B in 2024",
      source: "TechCrunch Africa",
      timeAgo: "3h",
      category: "Technology",
    },
    {
      id: 2,
      title: "New Investment Fund Launches Focused on West Africa",
      source: "Investment Weekly",
      timeAgo: "6h",
      category: "Finance",
    },
    {
      id: 3,
      title: "Renewable Energy Projects Gain Momentum Across Continent",
      source: "Green Business Africa",
      timeAgo: "1d",
      category: "Energy",
    },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      alert("Post shared successfully!");
      setPostText("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto", padding: "var(--ds-space-6) var(--ds-space-4)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr 320px",
            gap: "var(--ds-space-4)"
          }}
        >
          {/* Left Sidebar */}
          <aside style={{ display: "grid", gap: "var(--ds-space-4)" }}>
            {/* Quick Links */}
            <Card>
              <CardBody>
                <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-3)", color: "var(--ds-text)" }}>
                  Quick Links
                </h3>
                <nav style={{ display: "grid", gap: "var(--ds-space-2)" }}>
                  <a
                    href="#profile"
                    onClick={(e) => { e.preventDefault(); window.location.hash = "#profile"; }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--ds-space-2)",
                      padding: "var(--ds-space-2)",
                      color: "var(--ds-text)",
                      textDecoration: "none",
                      fontSize: "var(--ds-text-sm)",
                      borderRadius: "var(--ds-radius-sm)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ds-surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon name="briefcase" style={{ width: 20, height: 20 }} />
                    My Profile
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); window.location.hash = "#projects"; }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--ds-space-2)",
                      padding: "var(--ds-space-2)",
                      color: "var(--ds-text)",
                      textDecoration: "none",
                      fontSize: "var(--ds-text-sm)",
                      borderRadius: "var(--ds-radius-sm)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ds-surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon name="briefcase" style={{ width: 20, height: 20 }} />
                    Browse Projects
                  </a>
                  <a
                    href="#search"
                    onClick={(e) => { e.preventDefault(); window.location.hash = "#search"; }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--ds-space-2)",
                      padding: "var(--ds-space-2)",
                      color: "var(--ds-text)",
                      textDecoration: "none",
                      fontSize: "var(--ds-text-sm)",
                      borderRadius: "var(--ds-radius-sm)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ds-surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon name="search" style={{ width: 20, height: 20 }} />
                    Search
                  </a>
                </nav>
              </CardBody>
            </Card>

            {/* News Section */}
            <Card>
              <CardBody>
                <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-3)", color: "var(--ds-text)" }}>
                  Latest News
                </h3>
                <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                  {newsArticles.map((article) => (
                    <a
                      key={article.id}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        display: "block",
                        padding: "var(--ds-space-2)",
                        color: "var(--ds-text)",
                        textDecoration: "none",
                        borderRadius: "var(--ds-radius-sm)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--ds-surface-2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                        {article.source} • {article.timeAgo}
                      </div>
                      <div style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, marginBottom: "var(--ds-space-1)" }}>
                        {article.title}
                      </div>
                      <Badge style={{ fontSize: "10px", padding: "2px 6px" }}>{article.category}</Badge>
                    </a>
                  ))}
                </div>
              </CardBody>
            </Card>
          </aside>

          {/* Main Feed */}
          <main style={{ display: "grid", gap: "var(--ds-space-4)" }}>
            {/* Create Post */}
            <Card>
              <CardBody>
                <form onSubmit={handlePostSubmit} style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                  <div style={{ display: "flex", gap: "var(--ds-space-3)", alignItems: "start" }}>
                    <Avatar size="md" initials="JD" />
                    <Input
                      placeholder="Share an update, article, or thought..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--ds-space-2)", borderTop: "1px solid var(--ds-border)" }}>
                    <div style={{ display: "flex", gap: "var(--ds-space-2)" }}>
                      <Button variant="ghost" size="sm" type="button">
                        <Icon name="plus" style={{ width: 16, height: 16 }} />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" type="button">
                        <Icon name="plus" style={{ width: 16, height: 16 }} />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" type="button">
                        <Icon name="plus" style={{ width: 16, height: 16 }} />
                        Article
                      </Button>
                    </div>
                    <Button variant="primary" size="sm" type="submit" disabled={!postText.trim()}>
                      Post
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>

            {/* Feed Posts */}
            {posts.map((post) => (
              <Card key={post.id}>
                <CardBody>
                  <div style={{ display: "flex", gap: "var(--ds-space-3)", marginBottom: "var(--ds-space-3)" }}>
                    <Avatar size="md" initials={post.authorAvatar} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-1)" }}>
                        <span style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text)" }}>
                          {post.author}
                        </span>
                        <span style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>
                          {post.authorTitle}
                        </span>
                        <span style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-subtle)" }}>
                          • {post.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", marginBottom: "var(--ds-space-4)", lineHeight: "var(--ds-leading-normal)" }}>
                    {post.content}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "var(--ds-space-3)", borderTop: "1px solid var(--ds-border)" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--ds-space-2)",
                        background: "none",
                        border: "none",
                        color: "var(--ds-text-muted)",
                        fontSize: "var(--ds-text-sm)",
                        cursor: "pointer",
                        padding: "var(--ds-space-2)",
                        borderRadius: "var(--ds-radius-sm)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--ds-surface-2)";
                        e.currentTarget.style.color = "var(--ds-text)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--ds-text-muted)";
                      }}
                    >
                      <Icon name="plus" style={{ width: 18, height: 18 }} />
                      Like ({post.likes})
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--ds-space-2)",
                        background: "none",
                        border: "none",
                        color: "var(--ds-text-muted)",
                        fontSize: "var(--ds-text-sm)",
                        cursor: "pointer",
                        padding: "var(--ds-space-2)",
                        borderRadius: "var(--ds-radius-sm)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--ds-surface-2)";
                        e.currentTarget.style.color = "var(--ds-text)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--ds-text-muted)";
                      }}
                    >
                      <Icon name="message" style={{ width: 18, height: 18 }} />
                      Comment ({post.comments})
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--ds-space-2)",
                        background: "none",
                        border: "none",
                        color: "var(--ds-text-muted)",
                        fontSize: "var(--ds-text-sm)",
                        cursor: "pointer",
                        padding: "var(--ds-space-2)",
                        borderRadius: "var(--ds-radius-sm)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--ds-surface-2)";
                        e.currentTarget.style.color = "var(--ds-text)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--ds-text-muted)";
                      }}
                    >
                      <Icon name="plus" style={{ width: 18, height: 18 }} />
                      Share ({post.shares})
                    </button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </main>

          {/* Right Sidebar - Advertisements */}
          <aside style={{ display: "grid", gap: "var(--ds-space-4)" }}>
            {advertisements.map((ad) => (
              <Card key={ad.id} style={{ border: "1px solid var(--ds-border-strong)" }}>
                <CardBody>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--ds-space-2)" }}>
                    <Badge tone="warning" style={{ fontSize: "10px" }}>Ad</Badge>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--ds-text-subtle)",
                        cursor: "pointer",
                        padding: "4px",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Icon name="ellipsis" style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                    {ad.title}
                  </h3>
                  <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-3)", lineHeight: "var(--ds-leading-normal)" }}>
                    {ad.description}
                  </p>
                  <Button variant="primary" size="sm" style={{ width: "100%" }}>
                    {ad.cta}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

