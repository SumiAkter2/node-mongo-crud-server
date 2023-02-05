const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const { CURSOR_FLAGS } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dBusers:eGPoPbZyvdc8EeAl@cluster0.hnxcxtq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usersCollection = client.db("nodeMongo").collection("users");
    const user = {
      name: "Sumi Akter",
      vill: "Bogura",
    };
    const result = await usersCollection.insertOne(user);
    console.log(result);
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
