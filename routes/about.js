const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const aboutCollection = require("../models/aboutModel");
require("dotenv").config();


const baseurl  = process.env.BASE_URL


const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

route.get("/", async (req, res, next) => {
  const aboutDatas = await aboutCollection.findOne({}).lean();

  res.render(path.join(rootPath, "views", "about"), {
    title: "About",
    aboutDatas,
    baseurl
  });
});

route.post("/submit", upload.single("image"), async (req, res, next) => {
  const aboutDatas = await aboutCollection.findOne({}).lean();
  const toUpload = {
    ...aboutDatas,
    pageTitle: req.body.pagetitle,
    keys: req.body.keys,
    leftimage: req?.file?.filename,
    subparagraph: req.body.subparagraph,
    title_one: req.body.title_one,
    title_two: req.body.title_two,
    title_three: req.body.title_three,
    paragraph_one: req.body.paragraph_one,
    paragraph_two: req.body.paragraph_two,
    paragraph_three: req.body.paragraph_three,
  };

  if (!aboutDatas) {
    await aboutCollection.insertOne(toUpload);
  } else {
    await aboutCollection.updateOne({ _id: aboutDatas }, toUpload);
  }

  res.redirect("/about");
});

route.post("/addkey", async (req, res) => {
  const Data = await aboutCollection.findOne({});
  const role = [req.body.key];
  if (!Data) {
    await aboutCollection.insertOne({ keys: role });
  } else {
    await aboutCollection.updateOne(
      { _id: Data._id },
      { keys: [...Data.keys, ...role] }
    );
  }
  res.redirect("/about");
});

route.use("/deleteKey/:id", async (req, res) => {
  const Data = await aboutCollection.findOne({});
  const toedit = req.params.id;
  const updatedRoles =
    Data &&
    Data.length != 0 &&
    Data.keys.filter((item, index) => index != toedit);
  await aboutCollection.updateOne({ _id: Data._id }, { keys: updatedRoles });

  res.redirect("/about");
});
module.exports = route;
