const express = require("express");
const chats = require("./data/data");

const app = express();

app.get("/", (req, res) => {
  res.send("API is listening");
});

app.get("/api/chat", (req, res) => {
  res.json(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((chat) => chat._id === Number(req.params.id));
  res.json(singleChat);
});

app.listen(5000, console.log("Server is listening on port 5000"));
