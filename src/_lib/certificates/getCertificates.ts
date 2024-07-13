export default async function getCertificates(params: any) {
  let string = "";

  params.filters === undefined
    ? (string = "undefined")
    : params?.filters?.map((item: any) => (string += `${item}/`));

  // const filter = params.filters.split(",");
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/certificates/${string}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
