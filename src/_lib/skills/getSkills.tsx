export default async function getSkillsList() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      next: { revalidate: 86400 },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
// export default async function getStaticProps() {
//   try {
//     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`);
//     return response.json();
//   } catch (error) {
//     console.log(error);
//   }
// }
