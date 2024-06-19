export default async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/projects`, {
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
