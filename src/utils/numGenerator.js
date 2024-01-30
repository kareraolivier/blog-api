export function numsGenerator() {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let num3 = Math.floor(Math.random() * 10);
  let num4 = Math.floor(Math.random() * 10);

  return {
    num1,
    num2,
    num3,
    num4,
  };
}
