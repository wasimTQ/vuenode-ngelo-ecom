const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./connection");

db.authenticate()
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/products", require("./routes/Products"));
app.use("/api/seller", require("./routes/Seller"));
app.use("/api/buyer", require("./routes/Buyer"));
app.use("/api/user", require("./routes/User"));

app.listen(3000, console.log("Listening"));
