export default function algorithmParamsAPI(array: string[]) {
  const newArray = array;
  newArray.unshift("category");

  if (newArray.length < 1) {
    return;
  } else {
    let obj: any = {};

    for (let i = 0; i < newArray.length - 1; i += 2) {
      let j = i + 1;
      obj[newArray[i]] = newArray[j];
    }

    let str = "";
    for (let [p, val] of Object.entries(obj)) {
      str += p + "/" + val + "/";
    }
    return { str, obj };
  }
}
