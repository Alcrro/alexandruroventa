export default async function getModule(param: any, slug: any) {
  try {
    if (param.filter === undefined) {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/performance/${param.category}`,
        { cache: "no-cache" }
      );

      return response.json();
    } else {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/performance/${param.category}/${slug}`,
        {
          cache: "no-cache",
        }
      );

      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}
