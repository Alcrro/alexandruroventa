export const EmailTemplate = ({ email, message }: { email: string; message: string }) => (
  <div style={{ fontFamily: "sans-serif", maxWidth: "600px" }}>
    <h2 style={{ marginBottom: "8px" }}>New message from {email}</h2>
    <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", color: "#333" }}>{message}</p>
  </div>
);
