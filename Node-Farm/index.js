const fs = require("fs");
const http = require("http");
const url = require("url");
// const inputText = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(inputText);
// //Non-blocking Assynchronous
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error🌞");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.writeFile(`./txt/final.txt`, `${data1} \n ${data2}`, "utf-8", (err) => {
//       console.log("Your file has been writen😄");
//     });
//   });
// });
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/ {%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/ {%IMAGE%}/g, product.image);
  output = output.replace(/ {%PRICE%}/g, product.price);
  output = output.replace(/ {%FROM%}/g, product.from);
  output = output.replace(/ {%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/ {%QUANTITY%}/g, product.quantity);
  output = output.replace(/ {%DESCRIPTION%}/g, product.decription);
  output = output.replace(/ {%ID%}/g, product.image);
  if (!product.organic)
    output = output.replace(/ {%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const dataa = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObject = JSON.parse(dataa);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join(" ");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    console.log(query);
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(dataa);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to  requests  on port 800");
});
