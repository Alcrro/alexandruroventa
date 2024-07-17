export default async function getModule(param: any, slug?: any) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/performance/category/${param.category}/${slug}`,
      {
        cache: "no-cache",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
