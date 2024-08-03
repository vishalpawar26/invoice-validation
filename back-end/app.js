const express = require("express");
const app = express();
const cors = require("cors");

const uploadRoute = require("./routes/uploadRoute");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.end("Hello from the server");
});

app.post("/upload", uploadRoute);

module.exports = app;
