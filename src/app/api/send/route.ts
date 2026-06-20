import { EmailTemplate } from "@/features/contact/EmailTemplate";
import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit: 1 email per IP per 10 minutes
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const lastSent = rateLimitMap.get(ip);
    if (lastSent && Date.now() - lastSent < RATE_LIMIT_MS) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }
    rateLimitMap.set(ip, Date.now());

    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "alexandru@alexandru-roventa.ro",
      to: process.env.CONTACT_EMAIL ?? "alexandru@alexandru-roventa.ro",
      subject: `New message from ${email}`,
      text: message,
      react: EmailTemplate({ email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
