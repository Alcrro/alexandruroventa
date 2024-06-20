export default async function getModule(param: any, slug: any) {
  console.log("getModule", slug);

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/performance/${slug}`,
      {
        cache: "no-cache",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
