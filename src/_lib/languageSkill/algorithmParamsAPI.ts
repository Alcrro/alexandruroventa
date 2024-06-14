export default function algorithmParamsAPI(array: string[]) {
  if (array.length < 1) {
    return;
  } else {
    let obj: any = {};

    for (let i = 1; i < array.length; i += 2) {
      let j = i + 1;
      obj[array[i]] = array[j];
    }

    let str = "";
    for (let [p, val] of Object.entries(obj)) {
      str += p + "/" + val + "/";
    }
    return { str, obj };
  }
}
