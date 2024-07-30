import { order } from "../certificates/order/order";
export function sortPerformance(params: { filter: string[] }) {
  let sort: any = {};

  let findIndex = params.filter.findIndex(
    (index) => index === "asc" || index === "desc"
  );

  let versionExist = params.filter.findIndex(
    (findIndex, index) => findIndex === "version"
  );

  let dateExist = params.filter.findIndex(
    (findIndex, index) => findIndex === "date"
  );

  if (versionExist >= 0) {
    sort["codeversions_details.codVersion"] =
      params.filter[findIndex] === "asc" ? 1 : -1;
  } else if (dateExist >= 0) {
    sort["codeversions_details.dateVersion"] =
      params.filter[findIndex] === "asc" ? 1 : -1;
  } else {
    sort[params.filter[findIndex - 1]] =
      params.filter[findIndex] === "asc" ? 1 : -1;
  }

  return {
    sort,
  };
}
