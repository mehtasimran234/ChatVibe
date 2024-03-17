const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const path = require("node:path");
const pathToFile = path.resolve(__dirname, "../images");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

const connectDB = require("./db/connect");
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRouter");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const User = require("./models/userModel");
const upload = require("./multer");

const app = express();

dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(pathToFile));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

app.post("/upload", upload.single("file"), (req, res) =>
  res.json(req.file.filename)
);

app.get("/image/:name", (req, res) => {
  res.sendFile(__dirname + "\\images\\" + req.params.name);
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error.response.data);
  }
};

start();
