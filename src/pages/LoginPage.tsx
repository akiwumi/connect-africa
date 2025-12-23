import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardBody } from "../components/Card";
import { setCurrentUserEmail, getProfileByEmail } from "../utils/storage";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Check if profile exists for this email
        const profile = getProfileByEmail(formData.email);
        if (profile) {
          // Set current user and redirect to profile
          setCurrentUserEmail(formData.email);
          window.location.hash = "#profile";
        } else {
          // Profile doesn't exist, redirect to registration
          setError("No profile found. Please register first.");
          setIsLoading(false);
        }
      } else {
        setError("Please enter both email and password");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--ds-space-8) var(--ds-space-4)" }}>
        <Card style={{ maxWidth: "440px", width: "100%" }}>
          <CardBody>
            <div style={{ textAlign: "center", marginBottom: "var(--ds-space-6)" }}>
              <h1 style={{ fontSize: "var(--ds-text-xl)", fontWeight: 800, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                Welcome Back
              </h1>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
                Sign in to access your LinkAfrica account
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "var(--ds-space-4)" }}>
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />

              {error && (
                <div
                  style={{
                    padding: "var(--ds-space-3)",
                    background: "rgba(180, 35, 24, 0.1)",
                    border: "1px solid var(--ds-danger)",
                    borderRadius: "var(--ds-radius-md)",
                    color: "var(--ds-danger)",
                    fontSize: "var(--ds-text-sm)",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--ds-space-2)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", cursor: "pointer" }}>
                  <input type="checkbox" style={{ cursor: "pointer" }} />
                  <span style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Remember me</span>
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset functionality would be implemented here");
                  }}
                  style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-primary)", textDecoration: "none" }}
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                style={{ width: "100%", marginTop: "var(--ds-space-2)" }}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div style={{ textAlign: "center", marginTop: "var(--ds-space-4)", paddingTop: "var(--ds-space-4)", borderTop: "1px solid var(--ds-border)" }}>
                <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: "0 0 var(--ds-space-3)" }}>
                  Don't have an account?
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  style={{ width: "100%" }}
                  onClick={() => (window.location.hash = "#register")}
                >
                  Create Account
                </Button>
              </div>

              {/* Demo Info */}
              <div
                style={{
                  marginTop: "var(--ds-space-4)",
                  padding: "var(--ds-space-3)",
                  background: "var(--ds-surface-2)",
                  borderRadius: "var(--ds-radius-md)",
                  fontSize: "var(--ds-text-xs)",
                  color: "var(--ds-text-muted)",
                }}
              >
                <strong>Note:</strong> You must complete registration first. Use the email you registered with to log in.
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

