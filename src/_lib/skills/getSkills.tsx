export default async function getSkillsList() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      // next: { revalidate: 86400 },
      cache: "no-cache",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
