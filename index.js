const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    app.get("/users", async (req, res) => {
      const cursor = await usersCollection.find({}).toArray();
      res.send(cursor);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await usersCollection.findOne(query);
      res.send(cursor);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
      console.log(result, user);
    });
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          address: user.address,
          email: user.email,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        option,
        updateUser
      );
      res.send(result);
      console.log(result);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      // console.log('trying to delete', id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
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
