import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Calendar } from "../components/Calendar";
import { saveProfile, setCurrentUserEmail } from "../utils/storage";

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

type RegistrationType = "entrepreneur" | "company";

export function RegistrationPage() {
  const [registrationType, setRegistrationType] = useState<RegistrationType>("company");
  const [currentTab, setCurrentTab] = useState(1);
  const [formData, setFormData] = useState({
    name: "Kwame Mensah",
    companyName: "TechVenture Solutions Ltd.",
    registrantName: "Kwame Mensah",
    ceoName: "Ama Asante",
    address: "123 Independence Avenue",
    town: "Accra",
    province: "Greater Accra",
    country: "Ghana",
    telephone: "+233 24 123 4567",
    email: "kwame.mensah@example.com",
    homepage: "https://www.techventure.com",
    registrationNumber: "C.123456",
    ghanaNationalId: "GHA-123456789-1",
    ghanaPostalAddress: "GA-123-4567",
    zoomSlot: "",
  });
  const [emailValid, setEmailValid] = useState(true); // Pre-validate the dummy email
  const [emailTouched, setEmailTouched] = useState(true);

  const isGhana = formData.country === "Ghana";
  const canProceedToNextTab = emailValid && formData.email !== "" && formData.zoomSlot !== "";

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    setEmailTouched(true);
    setEmailValid(validateEmail(email));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate available time slots (9am-5pm, hourly) for next 5 working days
  const generateTimeSlots = () => {
    const slots: Array<{ date: string; time: string; label: string; dateTime: Date }> = [];
    const today = new Date();
    let daysAdded = 0;
    let workingDays = 0;

    while (workingDays < 5) {
      const date = new Date(today);
      date.setDate(today.getDate() + daysAdded);
      const dayOfWeek = date.getDay();

      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dateStr = date.toISOString().split("T")[0];
        for (let hour = 9; hour <= 17; hour++) {
          const timeStr = `${hour.toString().padStart(2, "0")}:00`;
          // Create date in local timezone
          const localDate = new Date(date);
          localDate.setHours(hour, 0, 0, 0);
          slots.push({
            date: dateStr,
            time: timeStr,
            dateTime: localDate,
            label: `${date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric"
            })} at ${timeStr}`
          });
        }
        workingDays++;
      }
      daysAdded++;
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSlotSelect = (slotKey: string) => {
    setFormData({ ...formData, zoomSlot: slotKey });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      <div className="registration-page-container">
        <div style={{ marginBottom: "var(--ds-space-6)", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "var(--ds-text-xl)",
              fontWeight: 800,
              marginBottom: "var(--ds-space-2)",
              color: "var(--ds-text)"
            }}
          >
            Registration
          </h1>
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); window.location.hash = "#home"; }}
            style={{
              fontSize: "var(--ds-text-sm)",
              color: "var(--ds-primary)",
              textDecoration: "none"
            }}
          >
            ← Back to Home
          </a>
        </div>

        {/* Registration Type Selection */}
        <Card style={{ marginBottom: "var(--ds-space-6)" }}>
          <CardBody>
            <div className="registration-type-buttons">
              <Button
                variant={registrationType === "entrepreneur" ? "primary" : "secondary"}
                onClick={() => setRegistrationType("entrepreneur")}
                style={{ flex: "1", maxWidth: "300px" }}
              >
                Register as Entrepreneur
              </Button>
              <Button
                variant={registrationType === "company" ? "primary" : "secondary"}
                onClick={() => setRegistrationType("company")}
                style={{ flex: "1", maxWidth: "300px" }}
              >
                Register as Company
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Pricing Information */}
        <Card style={{ marginBottom: "var(--ds-space-6)", border: "2px solid var(--ds-primary)" }}>
          <CardBody>
            <h2
              style={{
                fontSize: "var(--ds-text-lg)",
                fontWeight: 700,
                marginBottom: "var(--ds-space-4)",
                color: "var(--ds-text)"
              }}
            >
              Registration Fee: €1,000
            </h2>
            <div style={{ marginBottom: "var(--ds-space-4)" }}>
              <h3
                style={{
                  fontSize: "var(--ds-text-md)",
                  fontWeight: 600,
                  marginBottom: "var(--ds-space-3)",
                  color: "var(--ds-text)"
                }}
              >
                Services Provided:
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "var(--ds-space-2)"
                }}
              >
                <li style={{ display: "flex", alignItems: "start", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20, marginTop: 2 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Comprehensive business vetting and verification process
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "start", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20, marginTop: 2 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Access to global investor network
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "start", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20, marginTop: 2 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Platform listing upon successful verification
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "start", gap: "var(--ds-space-2)" }}>
                  <Icon name="check" style={{ color: "var(--ds-success)", width: 20, height: 20, marginTop: 2 }} />
                  <span style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)" }}>
                    Direct connection with verified investors
                  </span>
                </li>
              </ul>
            </div>
            <div
              style={{
                padding: "var(--ds-space-4)",
                background: "var(--ds-surface-2)",
                borderRadius: "var(--ds-radius-sm)",
                marginBottom: "var(--ds-space-4)"
              }}
            >
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", margin: 0, marginBottom: "var(--ds-space-2)" }}>
                <strong>Payment Terms:</strong>
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "var(--ds-space-2)",
                  fontSize: "var(--ds-text-sm)",
                  color: "var(--ds-text-muted)"
                }}
              >
                <li>• The €1,000 registration fee will be held in escrow until verification is completed (5 working days)</li>
                <li>• If verification passes: You will be registered on the platform, and the fee is non-refundable</li>
                <li>• If verification fails: €900 will be refunded (€100 deducted for administrative costs)</li>
                <li>• <strong>Important:</strong> Costs are per project submission. Each project submitted will be subject to a €1,000 charge for the year</li>
              </ul>
            </div>
            <div
              style={{
                padding: "var(--ds-space-4)",
                background: "var(--ds-warning)",
                backgroundImage: "linear-gradient(to right, rgba(180, 83, 9, 0.1), rgba(180, 83, 9, 0.05))",
                borderRadius: "var(--ds-radius-sm)",
                border: "1px solid rgba(180, 83, 9, 0.3)"
              }}
            >
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", margin: 0, marginBottom: "var(--ds-space-2)" }}>
                <strong>⚠️ Zoom Call Requirement:</strong>
              </p>
              <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text)", margin: 0 }}>
                Verification includes a mandatory Zoom call. You must be available for the scheduled call. If you do not formally cancel the meeting at least 1 hour before the scheduled time, a €100 fine will be applied. This fine will be added to your application fee if approved, or deducted from your refund if rejected.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Tabs */}
        <Card>
          <CardBody>
            <div
              className="registration-tabs"
              style={{
                marginBottom: "var(--ds-space-6)",
                borderBottom: "2px solid var(--ds-border)"
              }}
            >
              <button
                onClick={() => setCurrentTab(1)}
                style={{
                  padding: "var(--ds-space-3) var(--ds-space-4)",
                  background: "none",
                  border: "none",
                  borderBottom: currentTab === 1 ? "2px solid var(--ds-primary)" : "2px solid transparent",
                  color: currentTab === 1 ? "var(--ds-primary)" : "var(--ds-text-muted)",
                  fontWeight: currentTab === 1 ? 600 : 400,
                  cursor: "pointer",
                  fontSize: "var(--ds-text-sm)",
                  marginBottom: "-2px"
                }}
              >
                Contact Information
              </button>
            </div>

            {/* Tab 1: Contact Information */}
            {currentTab === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canProceedToNextTab) {
                    // Save profile data
                    const profileData = {
                      email: formData.email,
                      registrationType,
                      name: registrationType === "entrepreneur" ? formData.name : undefined,
                      companyName: registrationType === "company" ? formData.companyName : undefined,
                      registrantName: registrationType === "company" ? formData.registrantName : undefined,
                      ceoName: registrationType === "company" ? formData.ceoName : undefined,
                      address: formData.address,
                      town: formData.town,
                      province: formData.province,
                      country: formData.country,
                      telephone: formData.telephone,
                      homepage: formData.homepage,
                      registrationNumber: registrationType === "company" ? formData.registrationNumber : undefined,
                      ghanaNationalId: isGhana ? formData.ghanaNationalId : undefined,
                      ghanaPostalAddress: isGhana ? formData.ghanaPostalAddress : undefined,
                      zoomSlot: formData.zoomSlot,
                      location: `${formData.town}, ${formData.province}, ${formData.country}`,
                    };
                    
                    saveProfile(profileData);
                    setCurrentUserEmail(formData.email);
                    
                    // Navigate to payment page
                    window.location.hash = "#payment";
                  }
                }}
                style={{ display: "grid", gap: "var(--ds-space-4)" }}
              >
                {registrationType === "entrepreneur" ? (
                  <Input
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <>
                    <Input
                      label="Company Name *"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Name of Person Registering *"
                      name="registrantName"
                      value={formData.registrantName}
                      onChange={handleInputChange}
                      required
                      placeholder="Full name of the person completing this registration"
                    />
                    <Input
                      label="CEO Name (if different from person registering)"
                      name="ceoName"
                      value={formData.ceoName}
                      onChange={handleInputChange}
                      placeholder="Leave blank if CEO is the person registering"
                    />
                  </>
                )}

                <Input
                  label="Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />

                <div className="registration-form-grid">
                  <Input
                    label="Town/City *"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Province/State *"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Select
                  label="Country *"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a country</option>
                  {AFRICAN_COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>

                <Input
                  label="Telephone Number *"
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                />

                <div>
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailTouched && !emailValid && (
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-danger)", margin: "var(--ds-space-2) 0 0" }}>
                      Please enter a valid email address
                    </p>
                  )}
                  {emailValid && (
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-success)", margin: "var(--ds-space-2) 0 0" }}>
                      ✓ Valid email address
                    </p>
                  )}
                  {!emailValid && emailTouched && (
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: "var(--ds-space-2) 0 0" }}>
                      You must provide a valid email to proceed to the next step
                    </p>
                  )}
                </div>

                {registrationType === "company" && (
                  <>
                    <Input
                      label="Company Registration Number *"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Homepage/Website"
                      name="homepage"
                      type="url"
                      value={formData.homepage}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                  </>
                )}

                {isGhana && (
                  <>
                    <Input
                      label="Ghana National Identification Number *"
                      name="ghanaNationalId"
                      value={formData.ghanaNationalId}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Ghana Digital Postal Address *"
                      name="ghanaPostalAddress"
                      value={formData.ghanaPostalAddress}
                      onChange={handleInputChange}
                      required
                      placeholder="GA-123-4567"
                    />
                  </>
                )}

                {/* Ghana Post GPS App Download Links - Only for Ghana registrants */}
                {isGhana && (
                  <Card style={{ background: "var(--ds-surface-2)" }}>
                    <CardBody>
                      <p style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, marginBottom: "var(--ds-space-3)", color: "var(--ds-text)" }}>
                        Don't have the Ghana Post GPS app?
                      </p>
                      <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-3)" }}>
                        Download the official Ghana Post GPS app to get your digital postal address.
                      </p>
                      <div style={{ display: "flex", gap: "var(--ds-space-3)", flexWrap: "wrap" }}>
                        <a
                          href="https://apps.apple.com/app/ghana-post-gps/id1234567890"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "var(--ds-space-2)",
                            padding: "var(--ds-space-2) var(--ds-space-4)",
                            background: "var(--ds-surface)",
                            border: "1px solid var(--ds-border)",
                            borderRadius: "var(--ds-radius-md)",
                            textDecoration: "none",
                            color: "var(--ds-text)",
                            fontSize: "var(--ds-text-sm)",
                            fontWeight: 500,
                            transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
                            flex: "1 1 auto",
                            minWidth: "140px",
                            justifyContent: "center"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--ds-primary-soft)";
                            e.currentTarget.style.borderColor = "var(--ds-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--ds-surface)";
                            e.currentTarget.style.borderColor = "var(--ds-border)";
                          }}
                        >
                          <Icon name="briefcase" style={{ width: 20, height: 20 }} />
                          Download for iOS
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.ghanapost.gps"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "var(--ds-space-2)",
                            padding: "var(--ds-space-2) var(--ds-space-4)",
                            background: "var(--ds-surface)",
                            border: "1px solid var(--ds-border)",
                            borderRadius: "var(--ds-radius-md)",
                            textDecoration: "none",
                            color: "var(--ds-text)",
                            fontSize: "var(--ds-text-sm)",
                            fontWeight: 500,
                            transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
                            flex: "1 1 auto",
                            minWidth: "140px",
                            justifyContent: "center"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--ds-primary-soft)";
                            e.currentTarget.style.borderColor = "var(--ds-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--ds-surface)";
                            e.currentTarget.style.borderColor = "var(--ds-border)";
                          }}
                        >
                          <Icon name="briefcase" style={{ width: 20, height: 20 }} />
                          Download for Android
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Zoom Call Calendar */}
                <div>
                  <label style={{ display: "block", fontSize: "var(--ds-text-xs)", fontWeight: 600, marginBottom: "var(--ds-space-4)", color: "var(--ds-text-muted)" }}>
                    Select Available Time Slot for Zoom Call * (All times in your local timezone)
                  </label>
                  <Card style={{ padding: "var(--ds-space-4)" }}>
                    <Calendar
                      slots={timeSlots}
                      selectedSlot={formData.zoomSlot}
                      onSelectSlot={handleSlotSelect}
                    />
                  </Card>
                  {!formData.zoomSlot && (
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-danger)", margin: "var(--ds-space-2) 0 0" }}>
                      Please select a time slot to continue
                    </p>
                  )}
                  {formData.zoomSlot && (
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-success)", margin: "var(--ds-space-2) 0 0" }}>
                      ✓ Time slot selected
                    </p>
                  )}
                  <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: "var(--ds-space-2) 0 0" }}>
                    Available slots: 9:00 AM - 5:00 PM (hourly) for the next 5 working days
                  </p>
                </div>

                <div className="registration-form-actions" style={{ marginTop: "var(--ds-space-4)" }}>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => window.location.hash = "#profile"}
                    style={{ fontSize: "var(--ds-text-xs)" }}
                  >
                    → View Profile (Demo)
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!canProceedToNextTab}
                  >
                    Continue to Next Step
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

