const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

const connectDB = require("./db/connect");
const userRouter = require("./routes/userRouter");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./backend/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif|svg)$/)) {
      return cb(new Error("Please upload a valid image"));
    }
    cb(undefined, true);
  },
});

const upload = multer({ storage: multerStorage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Image uploaded");
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
    console.log(`${error}`);
  }
};

start();
