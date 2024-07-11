export default async function getCertificates() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
