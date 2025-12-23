import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card, CardBody } from "../components/Card";
import { Icon } from "../components/Icon";
import { Badge } from "../components/Badge";

export function PaymentPage() {
  // Pre-fill form with dummy data
  const [paymentData, setPaymentData] = useState({
    cardNumber: "4532 1234 5678 9010",
    expiryDate: "12/26",
    cvv: "123",
    cardholderName: "Kwame Mensah",
    billingAddress: "123 Independence Avenue",
    billingCity: "Accra",
    billingCountry: "Ghana",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) {
      value = value.replace(/(.{4})/g, "$1 ").trim();
      setPaymentData({ ...paymentData, cardNumber: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
      setPaymentData({ ...paymentData, expiryDate: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      setIsProcessing(false);
      
      // Redirect to profile page after showing success message
      setTimeout(() => {
        window.location.hash = "#profile";
      }, 2000);
    }, 2000);
  };

  const isFormValid = 
    paymentData.cardNumber.replace(/\s/g, "").length === 16 &&
    paymentData.expiryDate.length === 5 &&
    paymentData.cvv.length === 3 &&
    paymentData.cardholderName &&
    paymentData.billingAddress &&
    paymentData.billingCity &&
    paymentData.billingCountry;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      <Navbar />

      <div className="payment-page-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "var(--ds-space-8) var(--ds-space-4)", width: "100%", boxSizing: "border-box", overflowX: "hidden" }}>
        <div style={{ marginBottom: "var(--ds-space-6)", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "var(--ds-text-xl)",
              fontWeight: 800,
              marginBottom: "var(--ds-space-2)",
              color: "var(--ds-text)"
            }}
          >
            Payment for Project Submission
          </h1>
          <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)" }}>
            Complete your payment to submit your project for verification
          </p>
        </div>

        {/* Payment Summary */}
        <Card style={{ marginBottom: "var(--ds-space-6)", border: "2px solid var(--ds-primary)" }}>
          <CardBody>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--ds-space-4)" }}>
              <div>
                <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, margin: 0, color: "var(--ds-text)" }}>
                  Project Submission Fee
                </h2>
                <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: "var(--ds-space-1) 0 0" }}>
                  Annual charge per project submission
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-primary)" }}>
                  €1,000
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "var(--ds-space-3)",
                background: "var(--ds-surface-2)",
                borderRadius: "var(--ds-radius-sm)",
                fontSize: "var(--ds-text-xs)",
                color: "var(--ds-text-muted)"
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Important:</strong> This fee will be held in escrow until verification is completed. 
                If verification fails, €900 will be refunded (€100 administrative fee).
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Payment Success Message */}
        {paymentSuccess && (
          <Card style={{ marginBottom: "var(--ds-space-6)", border: "2px solid var(--ds-success)", background: "var(--ds-surface-2)" }}>
            <CardBody>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-3)", textAlign: "left" }}>
                <Icon name="check" style={{ width: 32, height: 32, color: "var(--ds-success)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, margin: "0 0 var(--ds-space-2)", color: "var(--ds-success)" }}>
                    Payment Successful!
                  </h2>
                  <p style={{ fontSize: "var(--ds-text-sm)", color: "var(--ds-text-muted)", margin: 0 }}>
                    Your payment of €1,000 has been processed and will be held in escrow until verification is completed. 
                    Redirecting to your profile...
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Payment Form */}
        <Card style={{ opacity: paymentSuccess ? 0.6 : 1, pointerEvents: paymentSuccess ? "none" : "auto" }}>
          <CardBody>
            <form onSubmit={handleSubmit} className="payment-form">
              <h2 style={{ fontSize: "var(--ds-text-lg)", fontWeight: 700, marginBottom: "var(--ds-space-2)", color: "var(--ds-text)" }}>
                Payment Details
              </h2>

              <Input
                label="Cardholder Name *"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />

              <Input
                label="Card Number *"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
              
              {/* Dummy Data Info */}
              <div
                style={{
                  padding: "var(--ds-space-3)",
                  background: "var(--ds-primary-soft)",
                  borderRadius: "var(--ds-radius-sm)",
                  fontSize: "var(--ds-text-xs)",
                  color: "var(--ds-text-muted)",
                  border: "1px dashed var(--ds-primary)",
                }}
              >
                <strong>Demo Mode:</strong> Form is pre-filled with dummy payment data for testing purposes.
              </div>

              <div className="payment-form-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--ds-space-4)", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
                <Input
                  label="Expiry Date *"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
                <Input
                  label="CVV *"
                  name="cvv"
                  type="password"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>

              <div style={{ marginTop: "var(--ds-space-2)" }}>
                <h3 style={{ fontSize: "var(--ds-text-md)", fontWeight: 600, marginBottom: "var(--ds-space-3)", color: "var(--ds-text)" }}>
                  Billing Address
                </h3>
              </div>

              <Input
                label="Address *"
                name="billingAddress"
                value={paymentData.billingAddress}
                onChange={handleInputChange}
                required
              />

              <div className="payment-form-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--ds-space-4)", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
                <Input
                  label="City *"
                  name="billingCity"
                  value={paymentData.billingCity}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Country *"
                  name="billingCountry"
                  value={paymentData.billingCountry}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div
                style={{
                  padding: "var(--ds-space-4)",
                  background: "var(--ds-surface-2)",
                  borderRadius: "var(--ds-radius-sm)",
                  marginTop: "var(--ds-space-2)"
                }}
              >
                <div style={{ display: "flex", alignItems: "start", gap: "var(--ds-space-2)" }}>
                  <Icon name="shield-check" style={{ width: 20, height: 20, color: "var(--ds-success)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "var(--ds-text-sm)", fontWeight: 600, margin: 0, color: "var(--ds-text)" }}>
                      Secure Payment
                    </p>
                    <p style={{ fontSize: "var(--ds-text-xs)", color: "var(--ds-text-muted)", margin: "var(--ds-space-1) 0 0" }}>
                      Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="payment-form-actions">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="form-action-btn"
                >
                  ← Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isFormValid || isProcessing}
                  className="form-action-btn"
                >
                  {isProcessing ? "Processing..." : "Pay €1,000"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

