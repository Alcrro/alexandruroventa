export default async function getModule(
  param: any,
  slug?: any,
  searchParams?: any
) {
  let search = "";

  if (searchParams !== undefined) {
    for (let [p, val] of Object.entries(searchParams)) {
      search += `${p}=${val}`;
    }
  }

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/performance/category/${param.category}/${slug}?${search}`,
      {
        cache: "no-cache",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
