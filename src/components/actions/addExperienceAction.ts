"use server";

export default async function addExperienceAction(formData: FormData) {
  try {
    const dataStart = formData.get("start-date");
    const dataEnd = formData.get("end-date");
    const experienceType = formData.get("experienceType");
    const textContent = formData.get("textContent");
    const message = formData.set("message", "test");

    if (experienceType === "noValue") {
      console.log("You must to choose one of the experience types");
    } else if (!textContent || dataStart === "2000-01-01") {
      console.log("something problem");
    } else {
      const response = await fetch("http://localhost:3000/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          startYear: dataStart,
          endYear: dataEnd,
          isEnded: false,
          className: experienceType,
          titleDescription: "bbg",
          descriptionMore: textContent,
        }),
      });
      if (response.status === 200) {
        formData.set("message", "successfully added");
      }
    }

    console.log(dataStart, dataEnd, experienceType, textContent);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
