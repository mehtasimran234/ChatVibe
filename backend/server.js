const express = require("express");
const cors = require("cors");
const chats = require("./data/data");

const app = express();

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

app.listen(5000, console.log("Server is listening on port 5000"));
