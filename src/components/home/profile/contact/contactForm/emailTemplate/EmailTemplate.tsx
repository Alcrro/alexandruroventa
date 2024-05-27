import * as React from "react";

interface EmailTemplateProps {
  email: string;
}

export const EmailTemplate = ({ email }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {email}!</h1>
  </div>
);
