import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { getProfileByEmail, getCurrentUserEmail, saveProfile, type UserProfile } from "../utils/storage";

export function PublicProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    const loadProfile = () => {
      // Get profile ID from URL hash or use current user
      const hash = window.location.hash;
      const match = hash.match(/#profile\/(.+)$/);
      const profileId = match ? decodeURIComponent(match[1]) : getCurrentUserEmail();
      
      if (profileId) {
        const profileData = getProfileByEmail(profileId);
        if (profileData) {
          // Set default profile image if none exists
          const profileWithImage = {
            ...profileData,
            profileImage: profileData.profileImage || "/images/profile-image.png",
          };
          setProfile(profileWithImage);
          setEditData(profileWithImage);
          setIsOwner(getCurrentUserEmail() === profileData.email);
        }
      }
    };

    loadProfile();
    
    // Reload when hash changes
    const handleHashChange = () => loadProfile();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleImageUpload = (type: "hero" | "profile") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      if (type === "hero") {
        setEditData({ ...editData, heroImage: imageData });
      } else {
        setEditData({ ...editData, profileImage: imageData });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!profile) return;
    
    // Merge edit data properly
    const updatedProfileData: Partial<UserProfile> = {
      ...profile,
      ...editData,
    };
    
    // Handle name/companyName properly
    if (profile.registrationType === "entrepreneur" && editData.name !== undefined) {
      updatedProfileData.name = editData.name;
    } else if (profile.registrationType === "company" && editData.companyName !== undefined) {
      updatedProfileData.companyName = editData.companyName;
    }
    
    const updatedProfile = saveProfile(updatedProfileData as any);
    
    setProfile(updatedProfile);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  if (!profile) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
        <Navbar />
        <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto", padding: "var(--ds-space-8) var(--ds-space-4)", textAlign: "center" }}>
          <p style={{ fontSize: "var(--ds-text-md)", color: "var(--ds-text-muted)" }}>
            Profile not found. Please complete registration first.
          </p>
          <Button variant="primary" onClick={() => window.location.hash = "#register"} style={{ marginTop: "var(--ds-space-4)" }}>
            Register Now
          </Button>
        </div>
      </div>
    );
  }

  const displayName = profile.registrationType === "entrepreneur" ? profile.name : profile.companyName;
  const initials = displayName?.split(" ").map(n => n[0]).join("").slice(0, 2) || "??";

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          background: profile.heroImage
            ? `url(${profile.heroImage}) center/cover no-repeat`
            : "linear-gradient(135deg, var(--ds-primary) 0%, var(--ds-primary-dark) 100%)",
          marginBottom: "var(--ds-space-8)",
        }}
      >
        {isOwner && isEditing && (
          <div style={{ position: "absolute", top: "var(--ds-space-4)", right: "var(--ds-space-4)" }}>
            <input
              ref={heroImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload("hero")}
              style={{ display: "none" }}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => heroImageInputRef.current?.click()}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon name="plus" style={{ width: 16, height: 16 }} />
              {editData.heroImage || profile.heroImage ? "Change" : "Add"} Hero Image
            </Button>
          </div>
        )}

        {/* Profile Image Section */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--ds-space-3)",
            width: "100%",
            maxWidth: "var(--ds-container)",
            padding: "0 var(--ds-space-4)",
          }}
        >
          <div style={{ position: "relative" }}>
            {(editData.profileImage || profile.profileImage) ? (
              <img
                src={editData.profileImage || profile.profileImage || ""}
                alt="Profile"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "var(--ds-radius-pill)",
                  border: "5px solid var(--ds-surface)",
                  objectFit: "cover",
                  background: "var(--ds-surface)",
                }}
              />
            ) : (
              <Avatar
                size="lg"
                initials={initials}
                style={{
                  width: "180px",
                  height: "180px",
                  fontSize: "56px",
                  border: "5px solid var(--ds-surface)",
                }}
              />
            )}
            {isOwner && isEditing && (
              <button
                onClick={() => profileImageInputRef.current?.click()}
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--ds-radius-pill)",
                  background: "var(--ds-primary)",
                  border: "3px solid var(--ds-surface)",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--ds-shadow-2)",
                }}
              >
                <Icon name="plus" style={{ width: 22, height: 22 }} />
              </button>
            )}
            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload("profile")}
              style={{ display: "none" }}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--ds-space-4)" }}>
            {isEditing ? (
              <Input
                name={profile.registrationType === "entrepreneur" ? "name" : "companyName"}
                value={profile.registrationType === "entrepreneur" 
                  ? (editData.name || profile.name || "") 
                  : (editData.companyName || profile.companyName || "")}
                onChange={handleInputChange}
                style={{
                  fontSize: "var(--ds-text-xl)",
                  fontWeight: 800,
                  textAlign: "center",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              />
            ) : (
              <h1
                style={{
                  fontSize: "var(--ds-text-2xl)",
                  fontWeight: 800,
                  margin: "0 0 var(--ds-space-2)",
                  color: "var(--ds-text)",
                }}
              >
                {displayName}
              </h1>
            )}
            <Badge tone="success" style={{ fontSize: "var(--ds-text-xs)", padding: "4px 12px", marginTop: "var(--ds-space-2)" }}>
              Verified {profile.registrationType === "company" ? "Company" : "Entrepreneur"}
            </Badge>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "var(--ds-container)", margin: "0 auto", padding: "var(--ds-space-8) var(--ds-space-4) 120px", marginTop: "120px" }}>
        {/* Action Bar */}
        {isOwner && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--ds-space-3)", marginBottom: "var(--ds-space-6)" }}>
            {isEditing ? (
              <>
                <Button variant="ghost" onClick={() => { setIsEditing(false); setEditData(profile); }}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                <Icon name="plus" style={{ width: 16, height: 16 }} />
                Edit Profile
              </Button>
            )}
          </div>
        )}

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "var(--ds-space-6)" }}>
          {/* Left Sidebar */}
          <aside style={{ display: "grid", gap: "var(--ds-space-4)", height: "fit-content" }}>
            {/* Contact Info Card */}
            <Card>
              <CardBody>
                <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                  Contact Information
                </h3>
                <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                  {profile.location && (
                    <div>
                      <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                        Location
                      </div>
                      {isEditing ? (
                        <Input
                          name="location"
                          value={editData.location || profile.location || ""}
                          onChange={handleInputChange}
                          style={{ fontSize: "var(--ds-text-sm)" }}
                        />
                      ) : (
                        <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", fontWeight: 500 }}>
                          {profile.location}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {profile.telephone && (
                    <div>
                      <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                        Phone
                      </div>
                      <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", fontWeight: 500 }}>
                        {profile.telephone}
                      </div>
                    </div>
                  )}

                  {profile.email && (
                    <div>
                      <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                        Email
                      </div>
                      <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", fontWeight: 500 }}>
                        {profile.email}
                      </div>
                    </div>
                  )}

                  {(profile.website || profile.homepage) && (
                    <div>
                      <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                        Website
                      </div>
                      <a
                        href={profile.website || profile.homepage || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "var(--ds-text-sm)",
                          color: "var(--ds-primary)",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {profile.website || profile.homepage}
                      </a>
                    </div>
                  )}

                  {profile.industry && (
                    <div>
                      <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                        Industry
                      </div>
                      {isEditing ? (
                        <Input
                          name="industry"
                          value={editData.industry || profile.industry || ""}
                          onChange={handleInputChange}
                          style={{ fontSize: "var(--ds-text-sm)" }}
                        />
                      ) : (
                        <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", fontWeight: 500 }}>
                          {profile.industry}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Company Details (if company) */}
            {profile.registrationType === "company" && (
              <Card>
                <CardBody>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                    Company Details
                  </h3>
                  <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                    {profile.numberOfEmployees && (
                      <div>
                        <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                          Employees
                        </div>
                        {isEditing ? (
                          <Input
                            name="numberOfEmployees"
                            value={editData.numberOfEmployees || profile.numberOfEmployees || ""}
                            onChange={handleInputChange}
                            type="number"
                            style={{ fontSize: "var(--ds-text-sm)" }}
                          />
                        ) : (
                          <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", fontWeight: 500 }}>
                            {profile.numberOfEmployees}
                          </div>
                        )}
                      </div>
                    )}

                    {profile.annualIncome && (
                      <div>
                        <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                          Annual Income
                        </div>
                        {isEditing ? (
                          <Input
                            name="annualIncome"
                            value={editData.annualIncome || profile.annualIncome || ""}
                            onChange={handleInputChange}
                            type="number"
                            style={{ fontSize: "var(--ds-text-sm)" }}
                          />
                        ) : (
                          <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", fontWeight: 500 }}>
                            €{parseInt(profile.annualIncome || "0").toLocaleString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}
          </aside>

          {/* Main Content */}
          <main style={{ display: "grid", gap: "var(--ds-space-6)" }}>
            {/* About Section */}
            <Card>
              <CardBody>
                <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                  About
                </h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editData.bio || editData.companyDescription || profile.bio || profile.companyDescription || ""}
                    onChange={handleInputChange}
                    placeholder={profile.registrationType === "entrepreneur" ? "Tell us about yourself..." : "Tell us about your company..."}
                    style={{
                      width: "100%",
                      minHeight: "200px",
                      padding: "var(--ds-space-3)",
                      border: "1px solid var(--ds-border)",
                      borderRadius: "var(--ds-radius-md)",
                      fontSize: "var(--ds-text-sm)",
                      fontFamily: "var(--ds-font-sans)",
                      resize: "vertical",
                    }}
                  />
                ) : (
                  <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", lineHeight: "var(--ds-leading-normal)", whiteSpace: "pre-wrap" }}>
                    {profile.bio || profile.companyDescription || "No description provided."}
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Additional Information */}
            {(profile.address || profile.town || profile.registrationNumber) && (
              <Card>
                <CardBody>
                  <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                    Additional Information
                  </h2>
                  <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                    {profile.address && (
                      <div>
                        <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                          Address
                        </div>
                        <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                          {profile.address}
                        </div>
                      </div>
                    )}

                    {profile.registrationNumber && (
                      <div>
                        <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                          Registration Number
                        </div>
                        <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                          {profile.registrationNumber}
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

