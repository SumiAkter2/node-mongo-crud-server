const express = require("express");
const cors = require("cors");
const app = express();
const { CURSOR_FLAGS } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run() {
  try {
  } finally {
  }
}
run().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Node Mongo Crud");
});
app.listen(port, () => {
  console.log("Node Mongo Crud server");
});
