import { useState, useRef, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { getCurrentUserEmail, getProfileByEmail, saveProfile } from "../utils/storage";

type UserType = "entrepreneur" | "company";

export function ProfilePage() {
  const currentUserEmail = getCurrentUserEmail();
  const initialProfile = currentUserEmail ? getProfileByEmail(currentUserEmail) : null;
  
  const [userType] = useState<UserType>(initialProfile?.registrationType || "company");
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile" | "analytics" | "contacts" | "notifications" | "pitch">("dashboard");
  
  // Hero and profile images - load from profile or use defaults
  const [heroImage, setHeroImage] = useState<string | null>(
    initialProfile?.heroImage || "/images/hospital.png"
  );
  const [profileImage, setProfileImage] = useState<string | null>(
    initialProfile?.profileImage || "/images/profile-image.png"
  );
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  // Ensure hero image defaults to hospital.png on mount if no profile image exists
  useEffect(() => {
    if (!initialProfile?.heroImage && !heroImage) {
      setHeroImage("/images/hospital.png");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pitchData, setPitchData] = useState({
    pitchDeckFile: null as File | null,
    businessPlanFile: null as File | null,
    businessCategory: "Fintech",
    permissionToPublish: true as boolean | null,
  });

  // Enhanced submitted pitches with popularity tracking
  const submittedPitches = [
    {
      id: 1,
      title: "Fintech Mobile Banking Platform - Series A",
      category: "Fintech",
      submittedDate: "2025-01-10",
      status: "approved",
      views: 470,
      backers: 12,
      fundingGoal: 2500000,
      funded: 1850000,
      description: "Revolutionary mobile banking solution for underserved markets in West Africa. Our platform enables seamless financial transactions and access to credit for millions of users.",
      popularity: "high" as const,
      trending: true,
      viewsLast7Days: 85,
      viewsLast30Days: 320,
      contactRequests: 12,
      averageTimeOnPitch: "3:45",
      conversionRate: 2.5,
    },
    {
      id: 2,
      title: "Agricultural Tech Platform Expansion",
      category: "AgriTech",
      submittedDate: "2024-12-15",
      status: "pending",
      views: 230,
      backers: 5,
      fundingGoal: 1800000,
      funded: 650000,
      description: "Expanding our existing agricultural technology platform to serve more farmers across East Africa with improved logistics and market access.",
      popularity: "medium" as const,
      trending: false,
      viewsLast7Days: 30,
      viewsLast30Days: 150,
      contactRequests: 5,
      averageTimeOnPitch: "2:10",
      conversionRate: 1.8,
    },
    {
      id: 3,
      title: "Renewable Energy Solutions for Rural Communities",
      category: "Renewable Energy",
      submittedDate: "2024-11-20",
      status: "approved",
      views: 890,
      backers: 28,
      fundingGoal: 3200000,
      funded: 2800000,
      description: "Solar solutions for off-grid rural communities, providing clean and affordable energy access to underserved populations.",
      popularity: "high" as const,
      trending: true,
      viewsLast7Days: 120,
      viewsLast30Days: 600,
      contactRequests: 28,
      averageTimeOnPitch: "4:20",
      conversionRate: 3.1,
    },
  ];
  
  const [fileErrors, setFileErrors] = useState({
    pitchDeck: "",
    businessPlan: "",
  });

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB for images

  const businessCategories = [
    "Technology", "Financial Services", "Healthcare", "Agriculture", "Education",
    "Energy", "Real Estate", "Manufacturing", "Retail & E-commerce",
    "Transportation & Logistics", "Media & Entertainment", "Food & Beverage",
    "Telecommunications", "Tourism & Hospitality", "Renewable Energy",
    "Fintech", "EdTech", "HealthTech", "AgriTech", "Other",
  ];
  
  const [profileData, setProfileData] = useState({
    name: "Kwame Mensah",
    bio: "Experienced entrepreneur with over 10 years in the technology sector. Founded two successful startups in Ghana, specializing in fintech solutions for underserved markets.",
    companyName: "TechVenture Solutions Ltd.",
    industry: "Financial Technology",
    location: "Accra, Ghana",
    website: "https://www.techventure.com",
    yearsInBusiness: "8",
    companyDescription: "TechVenture Solutions is a leading fintech company in West Africa, providing innovative mobile banking solutions and payment processing services.",
    numberOfEmployees: "75",
    annualIncome: "2500000",
    cvFile: null as File | null,
    // Additional company details
    registrationNumber: "RC-123456",
    taxId: "TIN-789012345",
    foundedYear: "2016",
    headquarters: "Accra, Ghana",
    phone: "+233 24 123 4567",
    email: "contact@techventure.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/techventure",
      twitter: "https://twitter.com/techventure",
      facebook: "https://facebook.com/techventure",
    },
    companyHistory: `TechVenture Solutions Ltd. was founded in 2016 by Kwame Mensah with a vision to bridge the financial inclusion gap in West Africa. Starting as a small team of 5 developers in Accra, the company has grown into a leading fintech platform serving over 500,000 active users across Ghana, Nigeria, and Côte d'Ivoire.

**2016 - Foundation Year**
The company began with a simple mobile money transfer application, addressing the challenge of unbanked populations in rural areas. Our first product, "MoneyFlow," gained 10,000 users within the first six months.

**2018 - Series Seed Funding**
Secured €500,000 in seed funding from local angel investors, enabling expansion of our development team and infrastructure. Launched our flagship product, "BankLink," connecting traditional banks with mobile money providers.

**2020 - Market Expansion**
Expanded operations to Nigeria and Côte d'Ivoire, establishing partnerships with major telecommunications companies. Reached 200,000 active users milestone and introduced merchant payment solutions.

**2022 - Series A Preparation**
Launched our B2B payment processing platform, serving over 1,000 small and medium enterprises. Achieved profitability and began preparing for Series A funding round.

**2024 - Current Status**
Now serving over 500,000 users with a team of 75 employees. Processing over €50 million in transactions monthly. Recognized as "Fintech Company of the Year" by Ghana Fintech Association.`,
  });

  // Handle hero image upload
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setHeroImage(imageData);
      
      // Save to profile
      if (currentUserEmail && initialProfile) {
        const updatedProfile = {
          ...initialProfile,
          heroImage: imageData,
        };
        saveProfile(updatedProfile);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle profile image upload
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setProfileImage(imageData);
      
      // Save to profile
      if (currentUserEmail && initialProfile) {
        const updatedProfile = {
          ...initialProfile,
          profileImage: imageData,
        };
        saveProfile(updatedProfile);
      }
    };
    reader.readAsDataURL(file);
  };

  // Mock data - Enhanced stats
  const stats = {
    submissionsCount: 3,
    profileViews: 127,
    pitchViews: 342,
    contactsMade: 18,
    connections: 12,
    serviceProviders: 8,
  };

  // Enhanced analytics with project popularity tracking
  const analytics = {
    profileViewsLast7Days: 28,
    profileViewsLast30Days: 127,
    pitchViewsLast7Days: 89,
    pitchViewsLast30Days: 342,
    engagementRate: 72,
    averageViewsPerProject: 114,
    topPerformingProject: "Fintech Mobile Banking Platform - Series A",
    contactConversionRate: 15.5,
    serviceProviderUtilization: 87,
  };

  const notifications = [
    {
      id: 1,
      type: "pitch_feedback",
      title: "Pitch Performance Update",
      message: "Your pitch has been viewed 23 times this week.",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "profile_view",
      title: "Profile Viewed",
      message: "Your profile was viewed by Global Ventures Fund.",
      timestamp: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "pitch_feedback",
      title: "Pitch Improvement Suggestion",
      message: "Your pitch has strong traction. Adding customer testimonials could help.",
      timestamp: "1 day ago",
      read: true,
    },
  ];

  // Interested investor contacts
  const investorContacts = [
    { 
      id: 1, 
      name: "Global Ventures Fund", 
      type: "Investment Fund", 
      status: "connected", 
      date: "2025-01-15",
      interestLevel: "high",
      lastContact: "2025-01-18",
      notes: "Showed strong interest in Fintech Mobile Banking Platform. Requested additional financial projections.",
    },
    { 
      id: 2, 
      name: "Impact Capital", 
      type: "Investment Fund", 
      status: "pending", 
      date: "2025-01-14",
      interestLevel: "medium",
      lastContact: "2025-01-14",
      notes: "Initial contact made. Waiting for response on Renewable Energy Solutions project.",
    },
    { 
      id: 3, 
      name: "Tech Investor A", 
      type: "Individual Investor", 
      status: "connected", 
      date: "2025-01-10",
      interestLevel: "high",
      lastContact: "2025-01-16",
      notes: "Experienced fintech investor. Discussed potential Series A participation.",
    },
    { 
      id: 4, 
      name: "Emerging Markets Fund", 
      type: "Investment Fund", 
      status: "connected", 
      date: "2025-01-08",
      interestLevel: "medium",
      lastContact: "2025-01-12",
      notes: "Interested in AgriTech expansion. Requested market analysis documentation.",
    },
    { 
      id: 5, 
      name: "African Growth Partners", 
      type: "Investment Fund", 
      status: "connected", 
      date: "2025-01-05",
      interestLevel: "low",
      lastContact: "2025-01-05",
      notes: "Initial connection established. Monitoring engagement.",
    },
    { 
      id: 6, 
      name: "Venture Capital West Africa", 
      type: "Investment Fund", 
      status: "connected", 
      date: "2024-12-28",
      interestLevel: "high",
      lastContact: "2025-01-17",
      notes: "Active discussions on multiple projects. Most promising connection so far.",
    },
  ];

  // Service provider contacts
  const serviceProviders = [
    {
      id: 1,
      name: "AfriMarketing Solutions",
      service: "Marketing",
      status: "active",
      joinedDate: "2024-11-15",
      utilization: "high",
      impact: "Helped increase pitch visibility by 45%. Created professional marketing materials for all three projects. Generated 28% more investor inquiries.",
      rating: 5,
    },
    {
      id: 2,
      name: "Ecobank Business Banking",
      service: "Banking Services",
      status: "active",
      joinedDate: "2024-09-20",
      utilization: "high",
      impact: "Set up business accounts and payment processing. Streamlined financial operations. Provided escrow account management for investment funds.",
      rating: 5,
    },
    {
      id: 3,
      name: "MediaConnect Africa",
      service: "Publicity",
      status: "active",
      joinedDate: "2024-12-01",
      utilization: "medium",
      impact: "Secured 3 feature articles in major African business publications. Increased brand awareness across West Africa. Helped attract 2 additional investors.",
      rating: 4,
    },
    {
      id: 4,
      name: "Legal Partners Ghana",
      service: "Legal",
      status: "active",
      joinedDate: "2024-10-10",
      utilization: "high",
      impact: "Reviewed and optimized all investment contracts. Ensured regulatory compliance across Ghana, Nigeria, and Côte d'Ivoire. Provided legal framework for Series A funding.",
      rating: 5,
    },
    {
      id: 5,
      name: "SocialBoost Digital",
      service: "Social Media",
      status: "active",
      joinedDate: "2024-11-25",
      utilization: "high",
      impact: "Managed LinkedIn and Twitter presence. Increased social media engagement by 120%. Created viral content that generated 500+ profile views in one week.",
      rating: 4,
    },
    {
      id: 6,
      name: "Ghana Commercial Bank",
      service: "Banking Services",
      status: "active",
      joinedDate: "2024-08-05",
      utilization: "medium",
      impact: "Primary business account for day-to-day operations. Provided business loans for operational expenses. Reliable local banking partner.",
      rating: 4,
    },
    {
      id: 7,
      name: "Brand Strategy Consulting",
      service: "Marketing",
      status: "active",
      joinedDate: "2025-01-05",
      utilization: "low",
      impact: "Recent addition. Developing comprehensive brand strategy for investor presentations. Early stage but promising results.",
      rating: 4,
    },
    {
      id: 8,
      name: "Press Release Network",
      service: "Publicity",
      status: "active",
      joinedDate: "2024-12-15",
      utilization: "medium",
      impact: "Distributed press releases for funding milestones. Secured coverage in 5 international publications. Enhanced credibility with investors.",
      rating: 4,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData({ ...profileData, cvFile: e.target.files[0] });
    }
  };

  const handlePitchDeckFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setFileErrors((prev) => ({ ...prev, pitchDeck: "File must be a PDF." }));
        setPitchData((prev) => ({ ...prev, pitchDeckFile: null }));
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileErrors((prev) => ({ ...prev, pitchDeck: "File size exceeds 10MB limit." }));
        setPitchData((prev) => ({ ...prev, pitchDeckFile: null }));
        return;
      }
      setFileErrors((prev) => ({ ...prev, pitchDeck: "" }));
      setPitchData((prev) => ({ ...prev, pitchDeckFile: file }));
    }
  };

  const handleBusinessPlanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setFileErrors((prev) => ({ ...prev, businessPlan: "File must be a PDF." }));
        setPitchData((prev) => ({ ...prev, businessPlanFile: null }));
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileErrors((prev) => ({ ...prev, businessPlan: "File size exceeds 10MB limit." }));
        setPitchData((prev) => ({ ...prev, businessPlanFile: null }));
        return;
      }
      setFileErrors((prev) => ({ ...prev, businessPlan: "" }));
      setPitchData((prev) => ({ ...prev, businessPlanFile: file }));
    }
  };

  const handlePitchDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setPitchData((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "radio" ? checked : value,
    }));
  };

  const canSubmitPitch = pitchData.pitchDeckFile !== null && 
                         pitchData.businessPlanFile !== null && 
                         pitchData.businessCategory !== "" && 
                         pitchData.permissionToPublish !== null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      {/* Hero Section with Customizable Image */}
      <div
        className="dashboard-hero"
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          backgroundImage: `url(${heroImage || "/images/hospital.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          marginBottom: "120px", // Space for profile image overlap
          overflow: "hidden",
        }}
      >
        {/* Hero Image Upload Overlay */}
        <div
          style={{
            position: "absolute",
            top: "var(--ds-space-4)",
            right: "var(--ds-space-4)",
          }}
        >
          <input
            ref={heroImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
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
            {heroImage ? "Change Hero Image" : "Add Hero Image"}
          </Button>
        </div>

        {/* Profile Image Section - Positioned at bottom of hero */}
        <div
          className="dashboard-profile-section"
          style={{
            position: "absolute",
            bottom: "-80px",
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
          {/* Profile Image */}
          <div style={{ position: "relative" }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "var(--ds-radius-pill)",
                  border: "4px solid var(--ds-surface)",
                  objectFit: "cover",
                  background: "var(--ds-surface)",
                }}
              />
            ) : (
              <Avatar
                size="lg"
                initials={userType === "entrepreneur" 
                  ? profileData.name.split(" ").map(n => n[0]).join("")
                  : profileData.companyName.split(" ").map(n => n[0]).join("")}
                style={{
                  width: "160px",
                  height: "160px",
                  fontSize: "48px",
                  border: "4px solid var(--ds-surface)",
                }}
              />
            )}
            <button
              onClick={() => profileImageInputRef.current?.click()}
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                width: "40px",
                height: "40px",
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
              <Icon name="plus" style={{ width: 20, height: 20 }} />
            </button>
            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Name and Badge */}
          <div style={{ textAlign: "center", marginTop: "var(--ds-space-4)" }}>
            <h1
              style={{
                fontSize: "var(--ds-text-xl)",
                fontWeight: 800,
                margin: "0 0 var(--ds-space-2)",
                color: "var(--ds-text)",
              }}
            >
              {userType === "entrepreneur" ? profileData.name : profileData.companyName}
            </h1>
            <Badge tone="success" style={{ fontSize: "var(--ds-text-xs)", padding: "4px 12px" }}>
              Verified
            </Badge>
          </div>
        </div>
      </div>

      <div className="ds-container" style={{ padding: "var(--ds-space-8) var(--ds-space-4) 120px" }}>
        {/* Tabs */}
        <div
          className="dashboard-tabs"
          style={{
            display: "flex",
            borderBottom: "1px solid var(--ds-border)",
            marginBottom: "var(--ds-space-6)",
            marginTop: "100px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "profile", label: "Profile" },
            { id: "pitch", label: "Project Pitch" },
            { id: "analytics", label: "Analytics" },
            { id: "contacts", label: "Contacts" },
            { id: "notifications", label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: "var(--ds-space-3) var(--ds-space-4)",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid var(--ds-primary)" : "2px solid transparent",
                color: activeTab === tab.id ? "var(--ds-primary)" : "var(--ds-text-muted)",
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: "pointer",
                fontSize: "var(--ds-text-sm)",
                whiteSpace: "nowrap",
                marginBottom: "-1px",
                transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
              }}
            >
              {tab.label}
              {tab.id === "notifications" && notifications.filter(n => !n.read).length > 0 && (
                <Badge
                  tone="danger"
                  style={{
                    marginLeft: "var(--ds-space-2)",
                    minWidth: "18px",
                    height: "18px",
                    padding: 0,
                    fontSize: "10px",
                  }}
                >
                  {notifications.filter(n => !n.read).length}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "var(--ds-space-4)",
                marginBottom: "var(--ds-space-6)",
              }}
            >
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                    {stats.submissionsCount}
                  </div>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Active Submissions</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                    {stats.profileViews}
                  </div>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Profile Views</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                    {stats.pitchViews}
                  </div>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Pitch Views</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                    {stats.contactsMade}
                  </div>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Contacts Made</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                    {stats.connections}
                  </div>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Connections</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                    {stats.serviceProviders}
                  </div>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Service Providers</div>
                </CardBody>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card style={{ marginBottom: "var(--ds-space-6)" }}>
              <CardBody>
                <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                  Quick Actions
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-3)" }}>
                  <Button variant="primary" onClick={() => setActiveTab("pitch")} style={{ width: "100%" }}>
                    Submit New Pitch
                  </Button>
                  <Button variant="secondary" onClick={() => setActiveTab("profile")} style={{ width: "100%" }}>
                    Edit Profile
                  </Button>
                  <Button variant="ghost" onClick={() => setActiveTab("analytics")} style={{ width: "100%" }}>
                    View Analytics
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Submitted Projects Overview */}
            <div style={{ marginBottom: "var(--ds-space-6)" }}>
              <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                Your Projects
              </h2>
              <div style={{ display: "grid", gap: "var(--ds-space-4)" }}>
                {submittedPitches.map((pitch) => {
                  const progress = (pitch.funded / pitch.fundingGoal) * 100;
                  return (
                    <Card key={pitch.id}>
                      <CardBody>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--ds-space-3)" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-2)", flexWrap: "wrap" }}>
                              <Badge>{pitch.category}</Badge>
                              <Badge tone={pitch.status === "approved" ? "success" : "warning"}>
                                {pitch.status === "approved" ? "Approved" : "Pending Review"}
                              </Badge>
                              {pitch.trending && (
                                <Badge tone="primary" style={{ fontSize: "10px", padding: "2px 8px" }}>
                                  Trending
                                </Badge>
                              )}
                              <Badge tone={pitch.popularity === "high" ? "success" : pitch.popularity === "medium" ? "warning" : undefined}>
                                {pitch.popularity === "high" ? "High Popularity" : pitch.popularity === "medium" ? "Medium Popularity" : "Low Popularity"}
                              </Badge>
                            </div>
                            <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, marginBottom: "var(--ds-space-1)", color: "var(--ds-text)" }}>
                              {pitch.title}
                            </h3>
                            <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: 0 }}>
                              Submitted: {new Date(pitch.submittedDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </p>
                          </div>
                        </div>

                        {/* Project Popularity Metrics */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "var(--ds-space-3)", marginBottom: "var(--ds-space-3)", padding: "var(--ds-space-3)", background: "var(--ds-surface-2)", borderRadius: "var(--ds-radius-sm)" }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                              {pitch.views}
                            </div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Total Views</div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-subtle)", marginTop: "2px" }}>
                              {pitch.viewsLast7Days}/7d • {pitch.viewsLast30Days}/30d
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-success)", marginBottom: "var(--ds-space-1)" }}>
                              {pitch.contactRequests}
                            </div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Contact Requests</div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-1)" }}>
                              {pitch.conversionRate}%
                            </div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Conversion Rate</div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-text)", marginBottom: "var(--ds-space-1)" }}>
                              {pitch.averageTimeOnPitch}
                            </div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>Avg. Time on Pitch</div>
                          </div>
                        </div>

                        {/* Funding Progress */}
                        <div style={{ marginBottom: "var(--ds-space-4)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--ds-space-2)" }}>
                            <span style={{ fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-primary)" }}>
                              €{pitch.funded.toLocaleString()}
                            </span>
                            <span style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)" }}>
                              of €{pitch.fundingGoal.toLocaleString()} ({Math.round(progress)}%)
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
                              }}
                            />
                          </div>
                        </div>

                        {/* View Project Link */}
                        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "var(--ds-space-3)", borderTop: "1px solid var(--ds-border)" }}>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              const params = new URLSearchParams();
                              params.set("q", pitch.title);
                              window.location.hash = `#projects?${params.toString()}`;
                            }}
                          >
                            <Icon name="briefcase" style={{ width: 16, height: 16, marginRight: "var(--ds-space-2)" }} />
                            View on Projects Page
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Analytics Summary */}
            <Card style={{ marginBottom: "var(--ds-space-6)" }}>
              <CardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--ds-space-4)" }}>
                  <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-text)" }}>
                    Analytics Overview
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("analytics")}>
                    View Full Analytics →
                  </Button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
                  <div>
                    <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                      Average Views per Project
                    </div>
                    <div style={{ fontSize: "var(--ds-text-xl)", fontWeight: 700, color: "var(--ds-primary)" }}>
                      {analytics.averageViewsPerProject}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                      Contact Conversion Rate
                    </div>
                    <div style={{ fontSize: "var(--ds-text-xl)", fontWeight: 700, color: "var(--ds-success)" }}>
                      {analytics.contactConversionRate}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                      Service Provider Utilization
                    </div>
                    <div style={{ fontSize: "var(--ds-text-xl)", fontWeight: 700, color: "var(--ds-primary)" }}>
                      {analytics.serviceProviderUtilization}%
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "var(--ds-space-4)", paddingTop: "var(--ds-space-4)", borderTop: "1px solid var(--ds-border)" }}>
                  <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                    Top Performing Project
                  </div>
                  <div style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text)" }}>
                    {analytics.topPerformingProject}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Investor Contacts Summary */}
            <Card style={{ marginBottom: "var(--ds-space-6)" }}>
              <CardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--ds-space-4)" }}>
                  <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-text)" }}>
                    Investor Contacts ({investorContacts.length})
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("contacts")}>
                    View All Contacts →
                  </Button>
                </div>
                <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                  {investorContacts.slice(0, 3).map((contact) => (
                    <div
                      key={contact.id}
                      style={{
                        padding: "var(--ds-space-3)",
                        background: "var(--ds-surface-2)",
                        borderRadius: "var(--ds-radius-sm)",
                        border: "1px solid var(--ds-border)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-1)", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text)" }}>
                              {contact.name}
                            </span>
                            <Badge tone={contact.interestLevel === "high" ? "success" : contact.interestLevel === "medium" ? "warning" : undefined}>
                              {contact.interestLevel === "high" ? "High Interest" : contact.interestLevel === "medium" ? "Medium Interest" : "Low Interest"}
                            </Badge>
                            <Badge tone={contact.status === "connected" ? "success" : "warning"}>
                              {contact.status === "connected" ? "Connected" : "Pending"}
                            </Badge>
                          </div>
                          <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-1)" }}>
                            {contact.type} • Connected {new Date(contact.date).toLocaleDateString()}
                          </div>
                          {contact.notes && (
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text)", marginTop: "var(--ds-space-2)" }}>
                              {contact.notes.substring(0, 100)}{contact.notes.length > 100 ? "..." : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {investorContacts.length > 3 && (
                    <div style={{ textAlign: "center", paddingTop: "var(--ds-space-2)" }}>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("contacts")}>
                        View {investorContacts.length - 3} more contacts →
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Service Providers Summary */}
            <Card style={{ marginBottom: "var(--ds-space-6)" }}>
              <CardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--ds-space-4)" }}>
                  <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, color: "var(--ds-text)" }}>
                    Service Providers ({serviceProviders.length})
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("contacts")}>
                    View All Providers →
                  </Button>
                </div>
                <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                  {serviceProviders.slice(0, 4).map((provider) => (
                    <div
                      key={provider.id}
                      style={{
                        padding: "var(--ds-space-3)",
                        background: "var(--ds-surface-2)",
                        borderRadius: "var(--ds-radius-sm)",
                        border: "1px solid var(--ds-border)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-1)", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text)" }}>
                              {provider.name}
                            </span>
                            <Badge>{provider.service}</Badge>
                            <Badge tone={provider.utilization === "high" ? "success" : provider.utilization === "medium" ? "warning" : undefined}>
                              {provider.utilization === "high" ? "High Utilization" : provider.utilization === "medium" ? "Medium Utilization" : "Low Utilization"}
                            </Badge>
                            <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  style={{
                                    color: i < provider.rating ? "var(--ds-warning)" : "var(--ds-border)",
                                    fontSize: "12px",
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <Badge tone={provider.status === "active" ? "success" : undefined}>
                              {provider.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-2)" }}>
                            Since {new Date(provider.joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                          </div>
                          <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text)", lineHeight: "var(--ds-leading-normal)" }}>
                            {provider.impact.substring(0, 120)}{provider.impact.length > 120 ? "..." : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {serviceProviders.length > 4 && (
                    <div style={{ textAlign: "center", paddingTop: "var(--ds-space-2)" }}>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("contacts")}>
                        View {serviceProviders.length - 4} more providers →
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardBody>
                <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                  Recent Activity
                </h2>
                <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      style={{
                        padding: "var(--ds-space-3)",
                        background: notification.read ? "transparent" : "var(--ds-surface-2)",
                        borderRadius: "var(--ds-radius-md)",
                        border: notification.read ? "1px solid var(--ds-border)" : "1px solid var(--ds-primary-soft)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div>
                          <p style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, margin: "0 0 var(--ds-space-1)", color: "var(--ds-text)" }}>
                            {notification.title}
                          </p>
                          <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: 0 }}>
                            {notification.message}
                          </p>
                        </div>
                        <span style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-subtle)", whiteSpace: "nowrap", marginLeft: "var(--ds-space-2)" }}>
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Profile Tab - Keep existing profile editing functionality */}
        {activeTab === "profile" && (
          <div style={{ display: "grid", gap: "var(--ds-space-6)" }}>
            <Card>
              <CardBody>
                <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                  Profile Information
                </h2>
                <div style={{ display: "grid", gap: "var(--ds-space-4)" }}>
                  {userType === "entrepreneur" ? (
                    <Input label="Full Name" name="name" value={profileData.name} onChange={handleInputChange} />
                  ) : (
                    <Input label="Company Name" name="companyName" value={profileData.companyName} onChange={handleInputChange} />
                  )}

                  <div className="ds-input-wrap">
                    <span className="ds-label">Bio / Company Description</span>
                    <textarea
                      name="bio"
                      value={userType === "entrepreneur" ? profileData.bio : profileData.companyDescription}
                      onChange={handleInputChange}
                      rows={5}
                      className="ds-input"
                      style={{ padding: "var(--ds-space-3) var(--ds-space-4)", height: "auto" }}
                    />
                  </div>

                  <Input label="Industry" name="industry" value={profileData.industry} onChange={handleInputChange} />
                  <Input label="Location" name="location" value={profileData.location} onChange={handleInputChange} />
                  <Input label="Website" name="website" type="url" value={profileData.website} onChange={handleInputChange} />

                  {userType === "company" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
                        <Input label="Number of Employees *" name="numberOfEmployees" type="number" value={profileData.numberOfEmployees} onChange={handleInputChange} required />
                        <Input label="Annual Income (€) *" name="annualIncome" type="number" value={profileData.annualIncome} onChange={handleInputChange} required />
                      </div>
                      
                      {/* Additional Company Details */}
                      <div style={{ marginTop: "var(--ds-space-4)", paddingTop: "var(--ds-space-4)", borderTop: "1px solid var(--ds-border)" }}>
                        <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                          Company Details
                        </h3>
                        <div style={{ display: "grid", gap: "var(--ds-space-4)" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
                            <Input label="Registration Number" name="registrationNumber" value={(profileData as any).registrationNumber || ""} onChange={handleInputChange} />
                            <Input label="Tax ID / TIN" name="taxId" value={(profileData as any).taxId || ""} onChange={handleInputChange} />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
                            <Input label="Founded Year" name="foundedYear" type="number" value={(profileData as any).foundedYear || ""} onChange={handleInputChange} />
                            <Input label="Years in Business" name="yearsInBusiness" type="number" value={profileData.yearsInBusiness} onChange={handleInputChange} />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
                            <Input label="Headquarters" name="headquarters" value={(profileData as any).headquarters || ""} onChange={handleInputChange} />
                            <Input label="Phone" name="phone" type="tel" value={(profileData as any).phone || ""} onChange={handleInputChange} />
                          </div>
                          <Input label="Email" name="email" type="email" value={(profileData as any).email || ""} onChange={handleInputChange} />
                          
                          {/* Social Media Links */}
                          <div>
                            <span className="ds-label" style={{ display: "block", marginBottom: "var(--ds-space-2)" }}>Social Media</span>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
                              <Input label="LinkedIn" name="linkedin" type="url" value={(profileData as any).socialMedia?.linkedin || ""} onChange={(e) => setProfileData({ ...profileData, socialMedia: { ...(profileData as any).socialMedia, linkedin: e.target.value } } as any)} />
                              <Input label="Twitter" name="twitter" type="url" value={(profileData as any).socialMedia?.twitter || ""} onChange={(e) => setProfileData({ ...profileData, socialMedia: { ...(profileData as any).socialMedia, twitter: e.target.value } } as any)} />
                              <Input label="Facebook" name="facebook" type="url" value={(profileData as any).socialMedia?.facebook || ""} onChange={(e) => setProfileData({ ...profileData, socialMedia: { ...(profileData as any).socialMedia, facebook: e.target.value } } as any)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {userType === "entrepreneur" && (
                    <div>
                      <label htmlFor="cv-upload" className="ds-label">Upload CV / Resume (PDF, DOC, DOCX)</label>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvFileChange} style={{ display: "none" }} id="cv-upload" />
                      <label
                        htmlFor="cv-upload"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "var(--ds-space-2)",
                          padding: "var(--ds-space-3) var(--ds-space-4)",
                          background: "var(--ds-surface)",
                          border: `1px solid ${profileData.cvFile ? "var(--ds-success)" : "var(--ds-border)"}`,
                          borderRadius: "var(--ds-radius-md)",
                          cursor: "pointer",
                          fontSize: "var(--ds-text-sm)",
                          fontWeight: 500,
                        }}
                      >
                        <Icon name="plus" style={{ width: 20, height: 20 }} />
                        {profileData.cvFile ? profileData.cvFile.name : "Choose File"}
                      </label>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--ds-space-4)" }}>
                    <Button variant="primary" onClick={() => alert("Profile updated successfully!")}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Company History / About Section - Only for companies */}
            {userType === "company" && (
              <Card>
                <CardBody>
                  <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                    Company History & About
                  </h2>
                  <div className="ds-input-wrap">
                    <span className="ds-label">Company History</span>
                    <textarea
                      name="companyHistory"
                      value={(profileData as any).companyHistory || ""}
                      onChange={handleInputChange}
                      rows={15}
                      className="ds-input"
                      style={{ 
                        padding: "var(--ds-space-3) var(--ds-space-4)", 
                        height: "auto",
                        fontFamily: "var(--ds-font-sans)",
                        lineHeight: "var(--ds-leading-normal)",
                        whiteSpace: "pre-wrap",
                      }}
                      placeholder="Tell the story of your company... Include milestones, achievements, growth trajectory, and vision for the future."
                    />
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginTop: "var(--ds-space-2)" }}>
                      Share your company's journey, milestones, achievements, and vision. This helps investors understand your growth trajectory and potential.
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--ds-space-4)" }}>
                    <Button variant="primary" onClick={() => alert("Company history updated successfully!")}>
                      Save History
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div style={{ display: "grid", gap: "var(--ds-space-6)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--ds-space-4)" }}>
              <Card>
                <CardBody>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                    Profile Views
                  </h3>
                  <p style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", margin: 0 }}>
                    {analytics.profileViewsLast30Days}
                  </p>
                  <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: "var(--ds-space-1) 0 0" }}>
                    {analytics.profileViewsLast7Days} in last 7 days
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                    Pitch Views
                  </h3>
                  <p style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", margin: 0 }}>
                    {analytics.pitchViewsLast30Days}
                  </p>
                  <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: "var(--ds-space-1) 0 0" }}>
                    {analytics.pitchViewsLast7Days} in last 7 days
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                    Engagement Rate
                  </h3>
                  <p style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", margin: 0 }}>
                    {analytics.engagementRate}%
                  </p>
                </CardBody>
              </Card>
            </div>

            {/* Enhanced Analytics */}
            <div style={{ display: "grid", gap: "var(--ds-space-4)" }}>
              <Card>
                <CardBody>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                    Project Performance
                  </h3>
                  <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>Average Views per Project</span>
                      <span style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, color: "var(--ds-text)" }}>
                        {analytics.averageViewsPerProject}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>Top Performing Project</span>
                      <span style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-primary)", textAlign: "right", maxWidth: "200px" }}>
                        {analytics.topPerformingProject}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>Contact Conversion Rate</span>
                      <span style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, color: "var(--ds-success)" }}>
                        {analytics.contactConversionRate}%
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                    Service Provider Utilization
                  </h3>
                  <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-primary)", marginBottom: "var(--ds-space-2)" }}>
                    {analytics.serviceProviderUtilization}%
                  </div>
                  <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
                    Active utilization of service providers for business growth
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div style={{ display: "grid", gap: "var(--ds-space-6)" }}>
            {/* Investor Contacts */}
            <div>
              <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                Investor Contacts
              </h2>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-4)" }}>
                Manage your connections with investors and investment funds on the platform.
              </p>

              <div style={{ display: "grid", gap: "var(--ds-space-3)", marginBottom: "var(--ds-space-8)" }}>
                {investorContacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardBody>
                      <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "var(--ds-space-3)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-3)", flex: 1 }}>
                          <Avatar
                            size="md"
                            initials={contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-1)", flexWrap: "wrap" }}>
                              <div style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, color: "var(--ds-text)" }}>
                                {contact.name}
                              </div>
                              <Badge tone={contact.interestLevel === "high" ? "success" : contact.interestLevel === "medium" ? "warning" : undefined}>
                                {contact.interestLevel === "high" ? "High Interest" : contact.interestLevel === "medium" ? "Medium Interest" : "Low Interest"}
                              </Badge>
                            </div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-2)" }}>
                              {contact.type} • Connected {new Date(contact.date).toLocaleDateString()}
                            </div>
                            {contact.notes && (
                              <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text)", padding: "var(--ds-space-2)", background: "var(--ds-surface-2)", borderRadius: "var(--ds-radius-sm)", marginTop: "var(--ds-space-2)" }}>
                                <strong>Notes:</strong> {contact.notes}
                              </div>
                            )}
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-subtle)", marginTop: "var(--ds-space-1)" }}>
                              Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge tone={contact.status === "connected" ? "success" : "warning"}>
                          {contact.status === "connected" ? "Connected" : "Pending"}
                        </Badge>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

            {/* Service Providers */}
            <div>
              <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                Service Providers
              </h2>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-4)" }}>
                Track your relationships with service providers and their impact on your business.
              </p>

              <div style={{ display: "grid", gap: "var(--ds-space-4)" }}>
                {serviceProviders.map((provider) => (
                  <Card key={provider.id}>
                    <CardBody>
                      <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "var(--ds-space-3)" }}>
                        <div style={{ display: "flex", alignItems: "start", gap: "var(--ds-space-3)", flex: 1 }}>
                          <Avatar
                            size="md"
                            initials={provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-1)", flexWrap: "wrap" }}>
                              <div style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, color: "var(--ds-text)" }}>
                                {provider.name}
                              </div>
                              <Badge>{provider.service}</Badge>
                              <Badge tone={provider.utilization === "high" ? "success" : provider.utilization === "medium" ? "warning" : undefined}>
                                {provider.utilization === "high" ? "High Utilization" : provider.utilization === "medium" ? "Medium Utilization" : "Low Utilization"}
                              </Badge>
                              <div style={{ display: "flex", gap: "2px" }}>
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      color: i < provider.rating ? "var(--ds-warning)" : "var(--ds-border)",
                                      fontSize: "14px",
                                    }}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-2)" }}>
                              Since {new Date(provider.joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                            </div>
                            <div style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", padding: "var(--ds-space-3)", background: "var(--ds-surface-2)", borderRadius: "var(--ds-radius-sm)", lineHeight: "var(--ds-leading-normal)" }}>
                              <strong style={{ display: "block", marginBottom: "var(--ds-space-1)" }}>Impact:</strong>
                              {provider.impact}
                            </div>
                          </div>
                        </div>
                        <Badge tone={provider.status === "active" ? "success" : undefined}>
                          {provider.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div style={{ display: "grid", gap: "var(--ds-space-3)" }}>
            {notifications.map((notification) => (
              <Card key={notification.id} style={{ background: notification.read ? "var(--ds-surface)" : "var(--ds-surface-2)" }}>
                <CardBody>
                  <p style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, margin: "0 0 var(--ds-space-1)", color: "var(--ds-text)" }}>
                    {notification.title}
                  </p>
                  <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                    {notification.message}
                  </p>
                  <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-subtle)", margin: "var(--ds-space-2) 0 0" }}>
                    {notification.timestamp}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Project Pitch Tab */}
        {activeTab === "pitch" && (
          <div style={{ display: "grid", gap: "var(--ds-space-6)" }}>
            {/* Submitted Pitches Section */}
            <div>
              <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                Your Submitted Pitches
              </h2>
              <div style={{ display: "grid", gap: "var(--ds-space-4)", marginBottom: "var(--ds-space-8)" }}>
                {submittedPitches.map((pitch) => {
                  const progress = (pitch.funded / pitch.fundingGoal) * 100;
                  return (
                    <Card key={pitch.id}>
                      <CardBody>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--ds-space-4)" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)", marginBottom: "var(--ds-space-2)", flexWrap: "wrap" }}>
                              <Badge>{pitch.category}</Badge>
                              <Badge tone={pitch.status === "approved" ? "success" : "warning"}>
                                {pitch.status === "approved" ? "Approved" : "Pending Review"}
                              </Badge>
                            </div>
                            <h3 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                              {pitch.title}
                            </h3>
                            <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-3)", lineHeight: "var(--ds-leading-normal)" }}>
                              {pitch.description}
                            </p>
                            <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-subtle)", margin: 0 }}>
                              Submitted: {new Date(pitch.submittedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                          </div>
                        </div>

                        {/* Funding Progress */}
                        <div style={{ marginBottom: "var(--ds-space-4)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--ds-space-2)" }}>
                            <span style={{ fontSize: "var(--ds-text-md)", fontWeight: 700, color: "var(--ds-primary)" }}>
                              €{pitch.funded.toLocaleString()}
                            </span>
                            <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
                              of €{pitch.fundingGoal.toLocaleString()}
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
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-4)" }}>
                            <span>{pitch.backers} backers</span>
                            <span>{pitch.views} views</span>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "var(--ds-space-3)" }}>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => {
                              const params = new URLSearchParams();
                              params.set("q", pitch.title);
                              window.location.hash = `#projects?${params.toString()}`;
                            }}
                          >
                            <Icon name="briefcase" style={{ width: 16, height: 16, marginRight: "var(--ds-space-2)" }} />
                            View on Projects Page
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Submit New Pitch Form */}
            <Card>
              <CardBody>
                <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-4)", color: "var(--ds-text)" }}>
                  Submit New Project Pitch
                </h2>
                <div style={{ display: "grid", gap: "var(--ds-space-4)" }}>
                  <div>
                    <label className="ds-label">Upload Pitch Deck (PDF, max 10MB) *</label>
                    <input type="file" accept=".pdf" onChange={handlePitchDeckFileChange} style={{ display: "none" }} id="pitch-deck-upload" />
                    <label
                      htmlFor="pitch-deck-upload"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--ds-space-2)",
                        padding: "var(--ds-space-3) var(--ds-space-4)",
                        background: "var(--ds-surface)",
                        border: `1px solid ${pitchData.pitchDeckFile ? "var(--ds-success)" : "var(--ds-border)"}`,
                        borderRadius: "var(--ds-radius-md)",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="plus" /> {pitchData.pitchDeckFile ? pitchData.pitchDeckFile.name : "Choose File"}
                    </label>
                  </div>

                  <div>
                    <label className="ds-label">Upload Business Plan (PDF, max 10MB) *</label>
                    <input type="file" accept=".pdf" onChange={handleBusinessPlanFileChange} style={{ display: "none" }} id="business-plan-upload" />
                    <label
                      htmlFor="business-plan-upload"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--ds-space-2)",
                        padding: "var(--ds-space-3) var(--ds-space-4)",
                        background: "var(--ds-surface)",
                        border: `1px solid ${pitchData.businessPlanFile ? "var(--ds-success)" : "var(--ds-border)"}`,
                        borderRadius: "var(--ds-radius-md)",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="plus" /> {pitchData.businessPlanFile ? pitchData.businessPlanFile.name : "Choose File"}
                    </label>
                  </div>

                  <Select
                    label="Business Category *"
                    name="businessCategory"
                    value={pitchData.businessCategory}
                    onChange={handlePitchDataChange}
                  >
                    <option value="">Select a category</option>
                    {businessCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>

                  <div>
                    <label className="ds-label">Permission to Publish *</label>
                    <div style={{ display: "flex", gap: "var(--ds-space-3)", marginTop: "var(--ds-space-2)" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                        <input
                          type="radio"
                          name="permissionToPublish"
                          value="true"
                          checked={pitchData.permissionToPublish === true}
                          onChange={() => setPitchData({ ...pitchData, permissionToPublish: true })}
                        />
                        Yes
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-2)" }}>
                        <input
                          type="radio"
                          name="permissionToPublish"
                          value="false"
                          checked={pitchData.permissionToPublish === false}
                          onChange={() => setPitchData({ ...pitchData, permissionToPublish: false })}
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <Button variant="primary" disabled={!canSubmitPitch} onClick={() => alert("Pitch submitted!")}>
                    Submit Project Pitch
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
