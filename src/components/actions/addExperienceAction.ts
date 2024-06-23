"use server";

const addExperienceAction = async (formData: FormData) => {
  const dataStart = formData.get("start-date");
  const dataEnd = formData.get("end-date");
  const experienceType = formData.get("experienceType");
  const textContent = formData.get("textContent");
  const isChecked = formData.get("isChecked");

  const response = await fetch("http://localhost:3000/api/experience", {
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
  });
  const data = await response.json();
  console.log(isChecked);

  return data;
};
export default addExperienceAction;
