import { EmailTemplate } from "../../../components/home/profile/contact/contactForm/emailTemplate/EmailTemplate";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
console.log(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, textarea } = body;
    const { data, error } = await resend.emails.send({
      from: "alexandru@alexandru-roventa.ro",
      to: "alexandru@alexandru-roventa.ro",
      subject: "something new",
      text: textarea,
      react: EmailTemplate({ email }),
    });

    if (error) {
      console.log(error);

      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
