import { order } from "../certificates/order/order";
export function sortPerformance(params: { filter: string[] }) {
  let sort: any = {};

  let findIndex = params.filter.findIndex(
    (index) => index === "asc" || index === "desc"
  );


  sort[params.filter[findIndex - 1]] =
    params.filter[findIndex] === "asc" ? 1 : -1;

  return {
    sort,
  };
}
