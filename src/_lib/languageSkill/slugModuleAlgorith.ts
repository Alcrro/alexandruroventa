function slugAlgorithm() {
  let characterStartAt = 65;
  let characterEndAt = 90;

  return String.fromCharCode(
    Math.floor(Math.random() * (characterEndAt - characterStartAt + 1)) +
      characterStartAt
  );
}

export function getRandomUppercaseString(size: number) {
  let result = "";
  for (let i = 0; i < size; i++) {
    result += slugAlgorithm();
  }
  return result;
}


