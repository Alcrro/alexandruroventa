export default async function getExperience() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/experience`);

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
