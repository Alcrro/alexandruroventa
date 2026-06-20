"use server";

const addExperienceAction = async (formData: FormData) => {
  const dataStart = formData.get("start-date");
  const dataEnd = formData.get("end-date");
  const experienceType = formData.get("experienceType");
  const textContent = formData.get("textContent");
  const isChecked = formData.get("isChecked");

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/experience/add-experience`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          startYear: dataStart,
          endYear: dataEnd,
          isEnded: isChecked === "on" ? true : false,
          className: String(experienceType).toLocaleLowerCase(),
          titleDescription: "bbg",
          descriptionMore: textContent,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default addExperienceAction;
