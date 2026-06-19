export default async function sendEmail(data: { email: string; message: string }) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: "Network error" };
  }
}
