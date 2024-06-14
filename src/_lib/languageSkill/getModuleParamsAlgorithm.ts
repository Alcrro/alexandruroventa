export default function getModuleParamsAlgorithm(param: any) {
  const newParam = param;

  let str: any = "";

  for (let [p, val] of Object.entries(newParam)) {
    if (val === undefined) {
    } else {
      str += `/${p}:${val}`;
    }
  }

  let obj: any = {};

  for (let entry of str.split("/")) {
    let pair = entry.split(":");

    obj[pair[0]] = pair[1];
  }
  return str;
}
