const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const skillCollection = require("../models/skillModel");
require("dotenv").config();

const baseurl = process.env.BASE_URL;
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

route.get("/add", async (req, res, next) => {
  res.render(path.join(rootPath, "views", "skillsAdd"), {
    title: "Add your skill",
  });
});

route.post("/add", upload.single("image"), async (req, res, next) => {
  const verify = req?.body?.id;
  const toUpload = {
    skill: req?.body?.skill,
    image: req?.file?.filename,
    description: req?.body?.description,
  };

  if (verify) {
    await skillCollection.updateOne({ _id: verify }, toUpload);
  } else if (!verify) {
    toUpload && (await skillCollection.insertOne(toUpload));
  }

  res.redirect("/skills/manage");
});

route.get("/manage", async (req, res, next) => {
  const datas = await skillCollection.find({}).lean();
  res.render(path.join(rootPath, "views", "skillsManage"), {
    title: "Manage your skill",
    datas,
    baseurl,
  });
});

route.get("/edit/:id", async (req, res, next) => {
  const datas = await skillCollection.findOne({ _id: req.params.id }).lean();

  res.render(path.join(rootPath, "views", "skillsAdd"), {
    title: "Edit your Background",
    datas,
  });
});

route.get("/delete/:id", async (req, res, next) => {
  req.params.id && (await skillCollection.deleteOne({ _id: req.params.id }));
  setTimeout(() => {
    res.redirect("/skills/manage");
  }, 2000);
});
module.exports = route;
