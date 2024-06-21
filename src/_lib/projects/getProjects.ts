export default async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/projects`, {
      next: { revalidate: 86400 },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
