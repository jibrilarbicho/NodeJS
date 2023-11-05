const fs = require("fs");
setTimeout(() => console.log("Timer 1 finished"));
setImmediate(() => console.log("Immeddiate 1 Finished"));
fs.readFile("./test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------->");
  setTimeout(() => console.log("Timer 1 finished"));
  setImmediate(() => console.log("Immeddiate 1 Finished"));
  process.nextTick(() => console.log("next tick finished"));
});
console.log("Hello from top level code");
