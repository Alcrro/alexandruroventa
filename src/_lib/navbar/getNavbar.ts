export default async function getNavbar() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/navbar/menu`,
      {
        method: "GET",
        cache: "force-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
