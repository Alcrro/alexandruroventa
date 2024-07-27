function processDuplicates(arr: string[]) {
  const counts = new Map();
  const indexesToRemove = new Set();
  const duplicates = new Set();

  // First pass: count occurrences and mark duplicates
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    counts.set(item, (counts.get(item) || 0) + 1);
    if (counts.get(item) > 1) {
      duplicates.add(item);
      indexesToRemove.add(i); // Mark duplicate for removal
      if (i + 1 < arr.length) {
        indexesToRemove.add(i + 1); // Mark next index for removal
      }
    }
  }

  const result = [];
  const changedIndexes = new Set();

  // Second pass: construct the result array
  for (let i = 0; i < arr.length; i++) {
    if (!indexesToRemove.has(i)) {
      result.push(arr[i]);
      if (duplicates.has(arr[i]) && !changedIndexes.has(arr[i])) {
        // Change the next index
        if (i + 1 < arr.length && !indexesToRemove.has(i + 1)) {
          if (arr[i + 1] === "asc") {
            result.push("desc");
          } else {
            result.push("asc");
          }
          changedIndexes.add(arr[i]); // Ensure this happens only once
        }
      }
    }
  }

  let str = result.join("/");

  return str;
}

export function transformLink(
  headers: string,
  params: { category: string; filter: string[] }
) {
  let str = "";
  let newArray = params.filter;
  let newStr = "";

  if (Object.keys(params)[1] === undefined) {
    str = `/performance/${params.category}`;
    return str;
  } else {
    newStr = processDuplicates(params.filter);
  }
  str += `/performance/${params.category}/${newStr}`;
  //   console.log(str);

  return str;
}
