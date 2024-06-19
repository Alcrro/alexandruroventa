export default function algorithmTest(array: string[]) {
  const newArray = array;
  const findIndex = newArray.findIndex(
    (filter) => filter === array[array.length - 1]
  );

  console.log(findIndex);

  let arrayString = newArray.join("/");

  //* check if exist
  if (findIndex >= 0) {
    newArray.splice(findIndex - 1, 2);
  }

  if (newArray.length < 1) {
    return;
  } else {
    let obj: any = {};

    for (let i = 0; i < newArray.length; i += 2) {
      let j = i + 1;

      obj[newArray[i]] = newArray[j];
    }

    let str = "";
    for (let [p, val] of Object.entries(obj)) {
      if (val === undefined) {
        str += p + "/";
      } else {
        str += p + "/" + val + "/";
      }
    }
    return { obj, str };
  }
}
