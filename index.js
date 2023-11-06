require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const { originalname, mimetype, size } = req.file;
  const data = {
    name: originalname,
    type: mimetype,
    size,
  };
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
