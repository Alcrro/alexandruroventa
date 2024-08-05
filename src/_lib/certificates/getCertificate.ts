export const getCertificateBySlug = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates/slug/${slug}`,
      {
        method: "GET",
        next: { revalidate: 86400 },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
