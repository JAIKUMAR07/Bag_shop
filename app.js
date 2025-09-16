const express = require("express");
const app = express();
const port = 3000;
const cookiesParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.use(express.static(path.join(__dirname, "views")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
// Database Connection

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`aur kuch Example app listening on port ${port}`);
});
