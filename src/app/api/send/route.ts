import { EmailTemplate } from "@/features/contact/EmailTemplate";
import { Resend } from "resend";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const rl = await checkRateLimit(req, "contact");
    if (!rl.allowed) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    if (typeof message !== "string" || message.length < 10 || message.length > 5000) {
      return Response.json({ error: "Message must be 10–5000 characters" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "alexandru@alexandru-roventa.ro",
      to: process.env.CONTACT_EMAIL ?? "alex.roventa94@gmail.com",
      subject: `New message from ${email}`,
      text: message,
      react: EmailTemplate({ email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
