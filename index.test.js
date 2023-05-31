const { forEach, map } = require("./index");

let sum = 0;
forEach([1, 2, 3], (value) => (sum = sum + value));
if (sum !== 6) throw new Error("Expected summing array to equal 6");
const result = map([1, 2, 3], (value) => {
  return value * 2;
});
//result ===[2,4,6]
