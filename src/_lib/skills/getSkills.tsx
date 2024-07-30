async function getSkillsList() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      // next: { revalidate: 86400 },
      cache: "no-cache",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function addSkill(data: string) {
  console.log(data);

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`, {
      // next: { revalidate: 86400 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skillName: data }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export { getSkillsList, addSkill };
