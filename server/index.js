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
      .db("project_exam")
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

app.post("/questions", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project_exam")
      .collection("questions")
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.get("/questions", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project_exam")
      .collection("questions")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/questions/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project_exam")
      .collection("questions")
      .deleteOne({ id: parseInt(req.params.id) });
    await con.close();
    if (data.deletedCount === 1) {
      res.status(200).json({ message: "Question deleted successfully" });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.get("/questions/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project_exam")
      .collection("questions")
      .findOne({ id: parseInt(req.params.id) });
    await con.close();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.put("/questions/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const filter = { id: parseInt(req.params.id) };
    const update = {
      $set: {
        ...req.body,
        date: Date.now(),
        modified: Date.now(),
      },
    };
    const options = { returnOriginal: false };
    const data = await con
      .db("project_exam")
      .collection("questions")
      .findOneAndUpdate(filter, update, options);
    await con.close();
    if (data.value) {
      console.log("Question updated:", data.value);
      res.status(200).json(data.value);
    } else {
      console.log("Question not found");
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.get("/questions/:id/answers", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project_exam")
      .collection("answers")
      .find({ question_id: parseInt(req.params.id) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.post("/questions/:id/answers", async (req, res) => {
  try {
    const con = await client.connect();
    const { answer, email } = req.body;
    const { id } = req.params;
    const result = await con
      .db("project_exam")
      .collection("answers")
      .insertOne({
        answer,
        question_id: parseInt(id),
        answer_id: Date.now(),
        date: new Date().toString(),
        email,
        upvote: 0,
        downvote: 0,
      });
    await con.close();
    res.send("Answer added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.put("/questions/:id/answers/:answerId", async (req, res) => {
  try {
    const con = await client.connect();
    const { answer, upvote, downvote, email } = req.body;
    console.log(email); // add this line to log the value of email
    const { id, answerId } = req.params;

    // Validate email
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email");
    }

    // Validate upvote and downvote
    if (!Number.isInteger(upvote) || !Number.isInteger(downvote)) {
      throw new Error("Invalid upvote or downvote");
    }

    const result = await con
      .db("project_exam")
      .collection("answers")
      .updateOne(
        { question_id: parseInt(id), answer_id: parseInt(answerId) },
        {
          $set: { answer, upvote, downvote, modified: Date.now() },
          $push: { upvotedBy: email },
        }
      );

    // Check if the document was updated
    if (result.modifiedCount !== 1) {
      throw new Error("Answer not found");
    }

    await con.close();
    res.send("Answer updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
});

app.delete("/questions/:id/answers/:answerId", async (req, res) => {
  try {
    const con = await client.connect();
    const { id, answerId } = req.params;
    const result = await con
      .db("project_exam")
      .collection("answers")
      .deleteOne({ question_id: parseInt(id), answer_id: parseInt(answerId) });
    await con.close();
    res.send("Answer deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An error occurred while processing your request",
      error,
    });
  }
});

app.listen(port, () => {
  console.log(`it works on port ${port} port`);
});
