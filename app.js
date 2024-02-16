const express = require("express");
const route = require("./src/router/router");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const env = require("dotenv");

env.config();

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}/api/v1`);
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helloooooooo");
});

app.use("/api/v1", route);

app.use((req, res, next) => {
  return res.status(404).json(`${req.url} Is Not Found`);
});

module.exports = app;
