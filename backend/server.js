const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db/connect");
const userRouter = require("./routes/userRouter");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use(notFound);
app.use(errorHandler);

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
