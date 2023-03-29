const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
const client = new MongoClient(uri);

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project_exam")
      .collection("users")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const con = await client.connect();
    const user = await con
      .db("social_media")
      .collection("users")
      .findOne({ email });
    if (user) {
      await con.close();
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email,
      password: hashedPassword,
    };
    const data = await con
      .db("project_exam")
      .collection("users")
      .insertOne(newUser);
    await con.close();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  try {
    const con = await client.connect();
    const user = await con
      .db("project_exam")
      .collection("users")
      .findOne({ email: req.body.email });
    await con.close();
    if (user === null) {
      return res.status(400).send("Cannot find user");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(user);
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`it works on port ${port} port`);
});
