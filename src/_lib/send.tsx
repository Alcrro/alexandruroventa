// export default async function sendEmail(data: {}) {
//   try {
//     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.status === 200) {
//       console.log("merge");

//       return response.json();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
