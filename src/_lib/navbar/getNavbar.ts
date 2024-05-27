export default async function getNavbar() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/navbar/menu`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
