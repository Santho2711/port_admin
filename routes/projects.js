const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const projectCollection = require("../models/projectsModel");
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
  res.render(path.join(rootPath, "views", "projectAdd"), {
    title: "Add your Project",
  });
});

route.post("/add", upload.single("project_image"), async (req, res, next) => {
  const verify = req?.body?.id;
  const toUpload = {
    projectName: req?.body?.project_name,
    projectUrl: req?.body?.project_url,
    image: req?.file?.filename,
    description: req?.body?.project_description,
  };

  if (verify) {
    await projectCollection.updateOne({ _id: verify }, toUpload);
  } else if (!verify) {
    toUpload && (await projectCollection.insertOne(toUpload));
  }

  res.redirect("/projects/manage");
});

route.get("/manage", async (req, res, next) => {
  const datas = await projectCollection.find({}).lean();
  res.render(path.join(rootPath, "views", "projectManage"), {
    title: "Manage your projects",
    datas,
    baseurl,
  });
});

route.get("/edit/:id", async (req, res, next) => {
  const datas = await projectCollection.findOne({ _id: req.params.id }).lean();

  res.render(path.join(rootPath, "views", "projectAdd"), {
    title: "Edit your Project",
    datas,
  });
});

route.get("/delete/:id", async (req, res, next) => {
  req.params.id && (await projectCollection.deleteOne({ _id: req.params.id }));
  setTimeout(() => {
    res.redirect("/projects/manage");
  }, 2000);
});
  


module.exports = route