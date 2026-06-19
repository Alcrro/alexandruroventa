import { iCertificate } from "@/types";

export async function getCertificates(params?: {
  org?: string;
  lang?: string;
  order?: "asc" | "desc";
}): Promise<iCertificate[]> {
  try {
    const query = new URLSearchParams();
    if (params?.org) query.set("org", params.org);
    if (params?.lang) query.set("lang", params.lang);
    if (params?.order) query.set("order", params.order);

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates?${query.toString()}`,
      { cache: "no-cache" }
    );
    const data = await response.json();
    return data.certificates ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
