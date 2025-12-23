import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";

export function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        className="landing-hero"
        style={{
          position: "relative",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--ds-space-16) var(--ds-space-4) var(--ds-space-12)",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Hero Image Background - Full Width */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            backgroundImage: "url('/images/hero-image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
        {/* Overlay for better text readability - lighter to preserve image colors */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            background: "linear-gradient(135deg, rgba(0, 123, 255, 0.4) 0%, rgba(0, 82, 204, 0.4) 100%)",
            zIndex: 2,
          }}
        />
        {/* Fallback gradient if image fails to load */}
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

        {/* Hero Content */}
        <div
          style={{
            maxWidth: "var(--ds-container)",
            margin: "0 auto",
            position: "relative",
            zIndex: 3,
            width: "100%",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "700px", textAlign: "left" }}>
            <div style={{ marginBottom: "var(--ds-space-6)" }}>
              <img 
                src="/images/LinkAfica-Master-Logo.png" 
                alt="LinkAfrica" 
                style={{ 
                  height: "60px", 
                  width: "auto", 
                  marginBottom: "var(--ds-space-4)",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))"
                }}
              />
            </div>
            <h1
              style={{
                fontSize: "var(--ds-text-3xl)",
                fontWeight: 800,
                lineHeight: "var(--ds-leading-tight)",
                marginBottom: "var(--ds-space-4)",
                color: "white",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              Connecting African Entrepreneurs with Global Investors
            </h1>
            <p
              style={{
                fontSize: "var(--ds-text-lg)",
                color: "white",
                marginBottom: "var(--ds-space-8)",
                lineHeight: "var(--ds-leading-normal)",
                opacity: 0.95,
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              LinkAfrica is the trusted platform where African companies and entrepreneurs pitch to global
              investors. All companies are thoroughly vetted, ensuring investors can invest with confidence.
            </p>
            <div style={{ display: "flex", gap: "var(--ds-space-3)", flexWrap: "wrap" }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => window.location.hash = "#register"}
                style={{
                  background: "white",
                  color: "var(--ds-primary)",
                }}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.location.hash = "#how-it-works"}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "2px solid white",
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: "var(--ds-space-12) var(--ds-space-4)",
          background: "var(--ds-surface)",
          marginBottom: "var(--ds-space-8)"
        }}
      >
        <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "var(--ds-text-xl)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "var(--ds-space-8)",
              color: "var(--ds-text)"
            }}
          >
            How It Works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--ds-space-6)"
            }}
          >
            <Card>
              <CardBody>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--ds-space-4)"
                  }}
                >
                  <Icon name="user-plus" style={{ color: "var(--ds-primary)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "var(--ds-text-md)",
                    fontWeight: 700,
                    marginBottom: "var(--ds-space-2)",
                    color: "var(--ds-text)"
                  }}
                >
                  For Entrepreneurs
                </h3>
                <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                  Submit your business for vetting. Once approved, pitch directly to verified global
                  investors and investment funds.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--ds-space-4)"
                  }}
                >
                  <Icon name="shield-check" style={{ color: "var(--ds-primary)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "var(--ds-text-md)",
                    fontWeight: 700,
                    marginBottom: "var(--ds-space-2)",
                    color: "var(--ds-text)"
                  }}
                >
                  Rigorous Vetting
                </h3>
                <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                  Every company undergoes comprehensive verification to ensure legitimacy, financial
                  transparency, and business viability.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--ds-space-4)"
                  }}
                >
                  <Icon name="briefcase" style={{ color: "var(--ds-primary)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "var(--ds-text-md)",
                    fontWeight: 700,
                    marginBottom: "var(--ds-space-2)",
                    color: "var(--ds-text)"
                  }}
                >
                  For Investors
                </h3>
                <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                  Access a curated pipeline of vetted African companies. Connect with promising
                  entrepreneurs and make informed investment decisions.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Funding Successes Section */}
      <section
        id="success-stories"
        style={{
          padding: "var(--ds-space-12) var(--ds-space-4)",
          maxWidth: "var(--ds-container)",
          margin: "0 auto var(--ds-space-8)"
        }}
      >
        <h2
          style={{
            fontSize: "var(--ds-text-xl)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "var(--ds-space-8)",
            color: "var(--ds-text)"
          }}
        >
          Funding Success Stories
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--ds-space-6)"
          }}
        >
          <Card>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ds-space-3)",
                  marginBottom: "var(--ds-space-4)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-surface-3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--ds-text-xl)",
                    fontWeight: 700,
                    color: "var(--ds-primary)"
                  }}
                >
                  $2.5M
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "var(--ds-text-md)",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--ds-text)"
                    }}
                  >
                    Tech Startup Series A
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--ds-text-xs)",
                      color: "var(--ds-text-muted)",
                      margin: 0
                    }}
                  >
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                Fintech company secured Series A funding from international investors to expand across
                West Africa.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ds-space-3)",
                  marginBottom: "var(--ds-space-4)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-surface-3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--ds-text-xl)",
                    fontWeight: 700,
                    color: "var(--ds-primary)"
                  }}
                >
                  $1.8M
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "var(--ds-text-md)",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--ds-text)"
                    }}
                  >
                    Agritech Seed Round
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--ds-text-xs)",
                      color: "var(--ds-text-muted)",
                      margin: 0
                    }}
                  >
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                Sustainable agriculture platform raised seed funding to connect smallholder farmers
                with markets.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ds-space-3)",
                  marginBottom: "var(--ds-space-4)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-surface-3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--ds-text-xl)",
                    fontWeight: 700,
                    color: "var(--ds-primary)"
                  }}
                >
                  $5M
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "var(--ds-text-md)",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--ds-text)"
                    }}
                  >
                    Renewable Energy Funding
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--ds-text-xs)",
                      color: "var(--ds-text-muted)",
                      margin: 0
                    }}
                  >
                    Cape Town, South Africa
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                Clean energy company received substantial funding to deploy solar solutions across
                rural communities.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Investor Quotes Section */}
      <section
        style={{
          padding: "var(--ds-space-12) var(--ds-space-4)",
          background: "var(--ds-surface-2)",
          marginBottom: "var(--ds-space-8)"
        }}
      >
        <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "var(--ds-text-xl)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "var(--ds-space-8)",
              color: "var(--ds-text)"
            }}
          >
            What Investors Say
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--ds-space-6)"
            }}
          >
            <Card>
              <CardBody>
                <p
                  style={{
                    fontSize: "var(--ds-text-md)",
                    color: "var(--ds-text)",
                    marginBottom: "var(--ds-space-4)",
                    fontStyle: "italic",
                    lineHeight: "var(--ds-leading-normal)"
                  }}
                >
                  "Investing in Africa has always been challenging due to concerns about legitimacy
                  and transparency. LinkAfrica's vetting process gives us confidence that we're
                  connecting with legitimate, vetted businesses."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-3)" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--ds-radius-pill)",
                      background: "var(--ds-primary-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--ds-primary)",
                      fontWeight: 700,
                      fontSize: "var(--ds-text-sm)"
                    }}
                  >
                    JS
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "var(--ds-text-sm)",
                        fontWeight: 700,
                        margin: 0,
                        color: "var(--ds-text)"
                      }}
                    >
                      John Smith
                    </p>
                    <p
                      style={{
                        fontSize: "var(--ds-text-xs)",
                        color: "var(--ds-text-muted)",
                        margin: 0
                      }}
                    >
                      Partner, Global Ventures Fund
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p
                  style={{
                    fontSize: "var(--ds-text-md)",
                    color: "var(--ds-text)",
                    marginBottom: "var(--ds-space-4)",
                    fontStyle: "italic",
                    lineHeight: "var(--ds-leading-normal)"
                  }}
                >
                  "The lack of verified information made African investments risky. LinkAfrica solved
                  this by providing thoroughly vetted companies, making our investment process much
                  smoother and more secure."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-3)" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--ds-radius-pill)",
                      background: "var(--ds-primary-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--ds-primary)",
                      fontWeight: 700,
                      fontSize: "var(--ds-text-sm)"
                    }}
                  >
                    MW
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "var(--ds-text-sm)",
                        fontWeight: 700,
                        margin: 0,
                        color: "var(--ds-text)"
                      }}
                    >
                      Maria Williams
                    </p>
                    <p
                      style={{
                        fontSize: "var(--ds-text-xs)",
                        color: "var(--ds-text-muted)",
                        margin: 0
                      }}
                    >
                      Investment Director, Impact Capital
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p
                  style={{
                    fontSize: "var(--ds-text-md)",
                    color: "var(--ds-text)",
                    marginBottom: "var(--ds-space-4)",
                    fontStyle: "italic",
                    lineHeight: "var(--ds-leading-normal)"
                  }}
                >
                  "LinkAfrica bridges the trust gap. We can now confidently explore investment
                  opportunities across the continent knowing that due diligence has already been
                  completed."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-3)" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--ds-radius-pill)",
                      background: "var(--ds-primary-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--ds-primary)",
                      fontWeight: 700,
                      fontSize: "var(--ds-text-sm)"
                    }}
                  >
                    DK
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "var(--ds-text-sm)",
                        fontWeight: 700,
                        margin: 0,
                        color: "var(--ds-text)"
                      }}
                    >
                      David Kim
                    </p>
                    <p
                      style={{
                        fontSize: "var(--ds-text-xs)",
                        color: "var(--ds-text-muted)",
                        margin: 0
                      }}
                    >
                      CEO, Emerging Markets Fund
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration CTAs Section */}
      <section
        style={{
          padding: "var(--ds-space-12) var(--ds-space-4)",
          maxWidth: "var(--ds-container)",
          margin: "0 auto var(--ds-space-16)"
        }}
      >
        <h2
          style={{
            fontSize: "var(--ds-text-xl)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "var(--ds-space-8)",
            color: "var(--ds-text)"
          }}
        >
          Get Started Today
        </h2>
        <div
          className="landing-registration-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "var(--ds-space-6)",
            maxWidth: "900px",
            margin: "0 auto"
          }}
        >
          {/* Entrepreneurs Registration */}
          <Card
            style={{
              border: "2px solid var(--ds-primary)",
              position: "relative"
            }}
          >
            <CardBody>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ds-space-3)",
                  marginBottom: "var(--ds-space-4)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon name="user-plus" style={{ color: "var(--ds-primary)", width: 28, height: 28 }} />
                </div>
                <h3
                  style={{
                    fontSize: "var(--ds-text-lg)",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--ds-text)"
                  }}
                >
                  For Entrepreneurs & Companies
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--ds-text-sm)",
                  color: "var(--ds-text-muted)",
                  marginBottom: "var(--ds-space-6)",
                  lineHeight: "var(--ds-leading-normal)"
                }}
              >
                Seeking investment for your African business? Join our platform to connect with
                verified global investors. Complete our vetting process and start pitching today.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 var(--ds-space-6)",
                  display: "grid",
                  gap: "var(--ds-space-3)"
                }}
              >
                <li style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Access to verified global investors
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Comprehensive business vetting
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Direct pitching opportunities
                  </span>
                </li>
              </ul>
              <Button 
                variant="primary" 
                size="md" 
                style={{ width: "100%" }}
                onClick={() => window.location.hash = "#register"}
              >
                Register as Entrepreneur
              </Button>
            </CardBody>
          </Card>

          {/* Investors Registration */}
          <Card
            style={{
              border: "2px solid var(--ds-primary)",
              position: "relative"
            }}
          >
            <CardBody>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--ds-space-3)",
                  marginBottom: "var(--ds-space-4)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--ds-radius-md)",
                    background: "var(--ds-primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon name="briefcase" style={{ color: "var(--ds-primary)", width: 28, height: 28 }} />
                </div>
                <h3
                  style={{
                    fontSize: "var(--ds-text-lg)",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--ds-text)"
                  }}
                >
                  For Investors & Investment Funds
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--ds-text-sm)",
                  color: "var(--ds-text-muted)",
                  marginBottom: "var(--ds-space-6)",
                  lineHeight: "var(--ds-leading-normal)"
                }}
              >
                Looking to invest in promising African businesses? Access our curated pipeline of
                thoroughly vetted companies and entrepreneurs ready for investment.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 var(--ds-space-6)",
                  display: "grid",
                  gap: "var(--ds-space-3)"
                }}
              >
                <li style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Pre-vetted investment opportunities
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Verified company credentials
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Direct connection with entrepreneurs
                  </span>
                </li>
              </ul>
              <Button 
                variant="primary" 
                size="md" 
                style={{ width: "100%" }}
                onClick={() => window.location.hash = "#register"}
              >
                Register as Investor
              </Button>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        style={{
          padding: "var(--ds-space-12) var(--ds-space-4)",
          background: "var(--ds-surface-2)",
          marginTop: "var(--ds-space-16)"
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "var(--ds-text-xl)",
              fontWeight: 700,
              marginBottom: "var(--ds-space-2)",
              color: "var(--ds-text)"
            }}
          >
            Stay Updated
          </h2>
          <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-4)" }}>
            Subscribe to our newsletter to receive the latest investment opportunities and platform updates.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const email = formData.get("newsletter-email");
              alert(`Thank you! We'll send updates to ${email}`);
              (e.target as HTMLFormElement).reset();
            }}
            style={{ display: "flex", gap: "var(--ds-space-2)", maxWidth: "400px", margin: "0 auto" }}
          >
            <Input
              name="newsletter-email"
              type="email"
              placeholder="Enter your email"
              required
              style={{ flex: 1 }}
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "var(--ds-space-8) var(--ds-space-4)",
          background: "var(--ds-surface)",
          borderTop: "1px solid var(--ds-border)",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto" }}>
          <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
            © 2025 LinkAfrica. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

