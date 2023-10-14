const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./db/connect");

const app = express();

dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is listening");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((chat) => chat._id === Number(req.params.id));
  res.json(singleChat);
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

start();
