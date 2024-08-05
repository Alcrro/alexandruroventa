export const getCertificates = async (params: any, searchParams: any) => {
  let search = "";

  if (searchParams !== undefined) {
    for (let [p, val] of Object.entries(searchParams)) {
      search += `${p}=${val}`;
    }
  }

  let string = "";

  params.filters === undefined
    ? (string = "undefined")
    : params?.filters?.map((item: any) => (string += `${item}/`));

  // const filter = params.filters.split(",");
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates/${string}?${search}`,
      {
        method: "GET",
        next: { revalidate: 86400 },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
