"use server";

export default async function AddSkillAction(formData: FormData) {
  try {
    const skillName = formData.get("skillName");
    const response = await fetch("http://localhost:3000/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skillName,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
