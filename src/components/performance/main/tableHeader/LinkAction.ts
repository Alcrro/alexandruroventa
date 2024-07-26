export function transformLink(
  headers: string,
  params: { category: string; filter: string[] }
) {
  let str = "";

  let newArray = [];

  if (Object.keys(params)[1] === undefined) {
    return str;
  } else {
    let newArray = params.filter;

    for (let i = 0; i <= newArray.length - 1; i++) {
      let count = 0;
      let j = 0;
      while (j <= i) {
        if (newArray[j] === newArray[i + 1]) {
          console.log(newArray[j] === newArray[i + 1]);
        }

        j++;
      }
    }
  }
  str += `/performance/${params.category}/${params.filter?.join("/")}`;
  //   console.log(str);

  return str;
}
