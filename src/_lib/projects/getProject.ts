export default async function getProject(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/projects/${slug}`, {
      cache: "no-cache",
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
