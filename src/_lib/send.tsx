export default async function sendEmail(data: {}) {
  const response = await fetch("http://localhost:3000/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    console.log("merge");
  }
}
