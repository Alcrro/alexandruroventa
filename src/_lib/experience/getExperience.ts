export default async function getExperience() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/experience`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      cache: "no-cache",
      // next: { revalidate: 3600 },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
