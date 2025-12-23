import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { Button, IconButton } from "../components/Button";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import { ListItem } from "../components/ListItem";
import { Navbar } from "../components/Navbar";

type Swatch = { name: string; varName: string; previewText?: string };

const swatches: Swatch[] = [
  { name: "Background", varName: "--ds-bg" },
  { name: "Surface", varName: "--ds-surface" },
  { name: "Surface 2", varName: "--ds-surface-2" },
  { name: "Surface 3", varName: "--ds-surface-3" },
  { name: "Border", varName: "--ds-border", previewText: "border" },
  { name: "Text", varName: "--ds-text", previewText: "Aa" },
  { name: "Text muted", varName: "--ds-text-muted", previewText: "Aa" },
  { name: "Primary", varName: "--ds-primary" },
  { name: "Primary hover", varName: "--ds-primary-hover" },
  { name: "Primary soft", varName: "--ds-primary-soft" },
  { name: "Success", varName: "--ds-success" },
  { name: "Warning", varName: "--ds-warning" },
  { name: "Danger", varName: "--ds-danger" }
];

function SwatchCard({ s }: { s: Swatch }) {
  const isBorder = s.varName === "--ds-border";
  const isText = s.varName.startsWith("--ds-text");
  return (
    <div className="ds-swatch">
      <div
        className="ds-swatch-chip"
        style={{
          background: isText ? "var(--ds-surface)" : `var(${s.varName})`,
          border: isBorder ? "1px solid var(--ds-border-strong)" : undefined,
          display: "grid",
          placeItems: "center",
          color: isText ? `var(${s.varName})` : "var(--ds-text-inverse)",
          fontWeight: 900
        }}
      >
        {s.previewText ?? ""}
      </div>
      <div className="ds-swatch-body">
        <div className="ds-swatch-name">{s.name}</div>
        <div className="ds-swatch-value">
          <span className="ds-code">{s.varName}</span>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ds-section">
      <div style={{ display: "grid", gap: 6 }}>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function DesignSystemPage() {
  return (
    <>
      <Navbar />

      <main className="ds-page">
        <div className="ds-container" style={{ display: "grid", gap: 24 }}>
          <header style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "var(--ds-text-2xl)",
                  lineHeight: "var(--ds-leading-tight)"
                }}
              >
                Design system
              </h1>
              <Badge tone="primary">v0</Badge>
            </div>
            <p style={{ margin: 0 }} className="ds-muted">
              Tokens + components inspired by the provided light, professional UI
              screenshots. This page is the single source of truth for all assets.
            </p>
          </header>

          <div className="ds-divider" />

          <Section
            title="Color tokens"
            subtitle="Role-based tokens you should use instead of hard-coded colors."
          >
            <div className="ds-swatches">
              {swatches.map((s) => (
                <SwatchCard key={s.varName} s={s} />
              ))}
            </div>
          </Section>

          <div className="ds-divider" />

          <Section
            title="Typography"
            subtitle="Sizes are mapped to CSS variables to keep usage consistent."
          >
            <Card>
              <CardBody style={{ display: "grid", gap: 14 }}>
                <div
                  style={{
                    display: "grid",
                    gap: 4,
                    paddingBottom: 14,
                    borderBottom: "1px solid var(--ds-border)"
                  }}
                >
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 900 }}>
                    Heading 1 — Design that feels trustworthy
                  </div>
                  <div className="ds-muted">
                    <span className="ds-code">--ds-text-2xl</span>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ fontSize: "var(--ds-text-xl)", fontWeight: 850 }}>
                    Heading 2 — Clear hierarchy
                  </div>
                  <div className="ds-muted">
                    <span className="ds-code">--ds-text-xl</span>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ fontSize: "var(--ds-text-lg)", fontWeight: 800 }}>
                    Heading 3 — Comfortable scanning
                  </div>
                  <div className="ds-muted">
                    <span className="ds-code">--ds-text-lg</span>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ fontSize: "var(--ds-text-md)" }}>
                    Body — This is the default body style for paragraphs and general
                    content. It’s optimized for reading.
                  </div>
                  <div className="ds-muted">
                    <span className="ds-code">--ds-text-md</span>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ fontSize: "var(--ds-text-sm)" }}>
                    Small — UI helper text, labels, and metadata.
                  </div>
                  <div className="ds-muted">
                    <span className="ds-code">--ds-text-sm</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Section>

          <div className="ds-divider" />

          <Section
            title="Components"
            subtitle="Every component variant/state in one place."
          >
            <div className="ds-grid ds-grid-2">
              <Card>
                <CardBody style={{ display: "grid", gap: 12 }}>
                  <div className="ds-card-title">Buttons</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button disabled>Disabled</Button>
                    <Button size="sm" variant="secondary" leftIcon={<Icon name="plus" />}>
                      Small
                    </Button>
                    <IconButton aria-label="More options">
                      <Icon name="ellipsis" />
                    </IconButton>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody style={{ display: "grid", gap: 12 }}>
                  <div className="ds-card-title">Inputs</div>
                  <div className="ds-grid">
                    <Input label="Default" placeholder="Enter text…" />
                    <Input
                      label="Search"
                      placeholder="Search"
                      inputClassName="ds-input--search"
                      leftIcon={<Icon name="search" />}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody style={{ display: "grid", gap: 12 }}>
                  <div className="ds-card-title">Badges</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <Badge>Neutral</Badge>
                    <Badge tone="primary">Primary</Badge>
                    <Badge tone="success">Success</Badge>
                    <Badge tone="warning">Warning</Badge>
                    <Badge tone="danger">Danger</Badge>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody style={{ display: "grid", gap: 12 }}>
                  <div className="ds-card-title">Avatars</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar size="sm" initials="EA" />
                    <Avatar size="md" initials="EA" />
                    <Avatar size="lg" initials="EA" />
                  </div>
                </CardBody>
              </Card>
            </div>
          </Section>

          <div className="ds-divider" />

          <Section
            title="Mockup (composition)"
            subtitle="A 3-column page composition similar to the screenshots, built only from tokens + components."
          >
            <div className="ds-page-grid">
              <aside style={{ display: "grid", gap: 12 }}>
                <Card>
                  <div
                    style={{
                      height: 72,
                      background:
                        "linear-gradient(135deg, rgba(10,102,194,0.35), rgba(0,0,0,0.0))",
                      borderTopLeftRadius: "var(--ds-radius-md)",
                      borderTopRightRadius: "var(--ds-radius-md)"
                    }}
                  />
                  <CardBody style={{ display: "grid", gap: 10, marginTop: -30 }}>
                    <Avatar size="lg" initials="EA" />
                    <div style={{ display: "grid", gap: 2 }}>
                      <div style={{ fontWeight: 900 }}>Eugene A.</div>
                      <div className="ds-muted" style={{ fontSize: "var(--ds-text-sm)" }}>
                        Builder • Founder • Community
                      </div>
                    </div>
                    <div className="ds-divider" />
                    <div style={{ display: "grid", gap: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="ds-muted">Profile views</span>
                        <span style={{ fontWeight: 900 }}>7</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="ds-muted">Post impressions</span>
                        <span style={{ fontWeight: 900 }}>7</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody style={{ display: "grid", gap: 10 }}>
                    <div className="ds-card-title">Saved items</div>
                    <div className="ds-list">
                      <ListItem
                        left={<span className="ds-code">#</span>}
                        title="Jobs"
                        meta="3 new recommendations"
                      />
                      <ListItem
                        left={<span className="ds-code">#</span>}
                        title="Groups"
                        meta="2 invites"
                      />
                      <ListItem
                        left={<span className="ds-code">#</span>}
                        title="Newsletters"
                        meta="Weekly digest"
                      />
                    </div>
                  </CardBody>
                </Card>
              </aside>

              <section style={{ display: "grid", gap: 12 }}>
                <Card>
                  <CardBody style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar size="sm" initials="EA" />
                      <Input
                        aria-label="Start a post"
                        placeholder="Start a post"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <Button variant="ghost" size="sm" leftIcon={<Icon name="plus" />}>
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" leftIcon={<Icon name="plus" />}>
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" leftIcon={<Icon name="plus" />}>
                        Write article
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody style={{ display: "grid", gap: 14 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 10
                      }}
                    >
                      <div style={{ display: "flex", gap: 10 }}>
                        <Avatar size="md" initials="AK" />
                        <div style={{ display: "grid", gap: 2 }}>
                          <div style={{ fontWeight: 900 }}>Ann Cathrin K.</div>
                          <div className="ds-muted" style={{ fontSize: "var(--ds-text-sm)" }}>
                            Reception • Lausanne • 2h
                          </div>
                        </div>
                      </div>
                      <IconButton aria-label="Post options">
                        <Icon name="ellipsis" />
                      </IconButton>
                    </div>

                    <div style={{ display: "grid", gap: 8 }}>
                      <div style={{ fontSize: "var(--ds-text-md)" }}>
                        “We’re expanding our presence. Here, proximity matters…”
                      </div>
                      <div
                        style={{
                          height: 240,
                          borderRadius: "var(--ds-radius-md)",
                          background: "var(--ds-surface-3)",
                          border: "1px solid var(--ds-border)",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 900,
                          color: "var(--ds-text-subtle)"
                        }}
                      >
                        Media placeholder
                      </div>
                    </div>

                    <div className="ds-divider" />
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <Button variant="ghost" size="sm">
                        Like
                      </Button>
                      <Button variant="ghost" size="sm">
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm">
                        Repost
                      </Button>
                      <Button variant="ghost" size="sm">
                        Send
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </section>

              <aside style={{ display: "grid", gap: 12 }}>
                <Card>
                  <CardBody style={{ display: "grid", gap: 10 }}>
                    <div className="ds-card-title">Today’s puzzle</div>
                    <div className="ds-muted" style={{ fontSize: "var(--ds-text-sm)" }}>
                      Solve a quick brain teaser in 60s or less.
                    </div>
                    <Button variant="secondary">Play</Button>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody style={{ display: "grid", gap: 10 }}>
                    <div className="ds-card-title">Add to your feed</div>
                    <div className="ds-list">
                      <ListItem
                        left={<Avatar size="sm" initials="KB" />}
                        title="Kate Beal"
                        meta="Executive • Media"
                        right={<Button variant="secondary" size="sm">Follow</Button>}
                      />
                      <ListItem
                        left={<Avatar size="sm" initials="SV" />}
                        title="SVT"
                        meta="Broadcast • Media"
                        right={<Button variant="secondary" size="sm">Follow</Button>}
                      />
                      <ListItem
                        left={<Avatar size="sm" initials="IH" />}
                        title="IHM Business School"
                        meta="Education"
                        right={<Button variant="secondary" size="sm">Follow</Button>}
                      />
                    </div>
                  </CardBody>
                </Card>
              </aside>
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}


