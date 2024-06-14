export default function slugAlgorithm(urlSlug: any, isIncluded: any) {
  let obj: any = {};
  let str = urlSlug.slug.toString();
  for (let entry of str.split(",")) {
    let pair = entry.split(":");
    const isForFilter = isIncluded.some((items: any) =>
      items.includes(pair[0])
    );

    if (isForFilter) {
      obj[pair[0]] = pair[1];
    }
  }

  return obj;
}
