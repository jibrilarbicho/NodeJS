const fs = require("fs");
const inputText = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(inputText);
//Non-blocking Assynchronous
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
  });
});
