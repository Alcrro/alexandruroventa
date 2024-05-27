export default async function getNavbar() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/navbar/menu`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}