export default function algorithmTest(array: string[]) {
  // console.log(array);
  if (array.length < 1) {
    return;
  } else {
    let obj: any = {};

    for (let i = 0; i < array.length; i += 2) {
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
