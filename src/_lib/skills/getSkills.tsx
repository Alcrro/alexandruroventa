async function getSkillsList() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      cache: "no-cache",
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function addSkill(data: {
  skillName: string;
  category: string;
  level: string;
  icon?: string;
}) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export { getSkillsList, addSkill };
