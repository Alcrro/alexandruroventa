export function filterCategory(params: { filter: string[] }) {
  let obj: any = {};
  obj[params.filter[0]] = params.filter[1];

  return obj;
}

export function filterLanguageType(params: { filter: string[] }) {
  let filterLanguageLearnt: any = {};

  let findIndexMatcher: number = params.filter.findIndex(
    (findIndex: any) => findIndex === "languageType"
  );

  console.log(findIndexMatcher);

  params.filter[findIndexMatcher] !== undefined &&
  !params.filter.includes("order")
    ? (filterLanguageLearnt[params.filter[findIndexMatcher]] =
        params.filter[findIndexMatcher + 1])
    : {};

  console.log(filterLanguageLearnt);

  return { filterLanguageLearnt };
}
