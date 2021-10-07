require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/users");
const blogPostRouter = require("./routes/blogposts");
const categoryRouter = require("./routes/categories");
const request = require("superagent");
const uploads = require("express-fileupload");
const multer = require("multer");
const path = require("path");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.zix6i.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
      (err) => {
        if (err) throw err;
        console.log("MongoDB connected");
      }
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// Define storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//Upload to storage
const upload = multer({ storage: storage });

connectDB();

//
const app = express();
app.use(express.json());
app.use("/api/images", express.static(path.join(__dirname, "/images")));
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.use(cors());
app.use(uploads());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/blogposts", blogPostRouter);
app.use("/api/categories", categoryRouter);

//
const PORT = process.env.PORT || 5000;

//
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));