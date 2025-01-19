const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const cors = require("cors");
require("./connect");
const demo = require("./Router");

app.use(express.json());
app.use(cors());
app.get("/", (Request, response) => {
  response.send("Hello World");
});
app.get("/about", (Request, response) => {
  response.send("About Page");
});

app.use("/api", demo);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});










