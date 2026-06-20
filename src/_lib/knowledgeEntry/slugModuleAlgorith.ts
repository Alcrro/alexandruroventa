function randomUppercaseChar() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

export function getRandomUppercaseString(size: number) {
  let result = "";
  for (let i = 0; i < size; i++) {
    result += randomUppercaseChar();
  }
  return result;
}
