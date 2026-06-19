import { iCertificate } from "@/types";

export async function getCertificateBySlug(slug: string): Promise<iCertificate | null> {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates/${slug}`,
      { cache: "no-cache" }
    );
    const data = await response.json();
    return data.certificate ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
