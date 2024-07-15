import { EmailTemplateProps } from "@/types";
import * as React from "react";

export const EmailTemplate = ({ email }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {email}!</h1>
  </div>
);
