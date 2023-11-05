const EventEmitter = require("events");
const myEmmiter = new EventEmitter();
myEmmiter.on("newSale", () => {
  console.log("There was a new sale ");
});
myEmmiter.on("newSale", () => {
  console.log("Customer name :Jonas ");
});
myEmmiter.emit("newSale");
