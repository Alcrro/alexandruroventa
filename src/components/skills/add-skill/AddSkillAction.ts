export default async function AddSkillAction(formData: FormData) {
  try {
    const skillName = formData.get("skillName");
    const response = await fetch(
      "http://localhost:3000/api/skills",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          skillName,
        }),
      }
    );

    if (response.status === 200) {
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
