export default async function getExperience() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/experience`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
