import { CertificatesResponse } from "@/types";

const EMPTY: CertificatesResponse = {
  data: [],
  totalDocuments: 0,
  page: 1,
  documentsPerPage: 12,
  orgs: [],
  langs: [],
};

export async function getCertificates(params?: {
  org?: string;
  lang?: string;
  order?: "asc" | "desc";
  page?: number;
  documentsPerPage?: number;
}): Promise<CertificatesResponse> {
  try {
    const query = new URLSearchParams();
    if (params?.org) query.set("org", params.org);
    if (params?.lang) query.set("lang", params.lang);
    if (params?.order) query.set("order", params.order);
    if (params?.page) query.set("page", String(params.page));
    if (params?.documentsPerPage) query.set("documentsPerPage", String(params.documentsPerPage));

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates?${query.toString()}`,
      { cache: "no-cache" }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return EMPTY;
  }
}
