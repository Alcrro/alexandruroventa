export default async function getLanguageSkill() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/performance`,
      {
        next: { revalidate: 86400 },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
