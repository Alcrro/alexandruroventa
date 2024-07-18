export default function algorithmTest(array: string[]) {
  const newArray = array;

  let indexOfDuplicates = [];

  if (newArray.length < 1) {
    return;
  } else {
    let obj: any = {};

    //! create an object with even as a key and odd as value from array
    //! iterate loop from 1 because first item is for category and we already have this
    //! increment by 2 to take each even as a key
    for (let i = 1; i < newArray.length; i += 2) {
      //! create a variable "j" and assign i+1 for each odd values
      let j = i + 1;

      obj[newArray[i]] = newArray[j];
    }

    let str = "";
    str += `${array[0]}/`;
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
