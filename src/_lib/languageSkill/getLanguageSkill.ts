export default async function getLanguageSkill() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/performance`);

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
