const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const homeDatas = require("../models/homeModel");
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

route.get("/", async (req, res, next) => {
  const Data = await homeDatas.findOne({});
  res.render(path.join(rootPath, "views", "home"), {
    title: "Home",
    name: Data?.name,
    roles: Data?.roles,
    resume: Data?.resume,
    baseurl,
  });
});

route.post("/submit", upload.single("resume"), async (req, res) => {
  const Data = await homeDatas.findOne({});
  console.log(Data, "data");
  const name = req.body.name;
  const file = req?.file?.filename;
  if (!Data) {
    await homeDatas.insertOne({
      name: name,
      resume: file,
    });
  } else {
    await homeDatas.updateOne(
      { _id: Data._id },
      { name: name && name, resume: file && file }
    );
  }
  res.redirect("/home");
});

route.post("/addRole", async (req, res) => {
  const Data = await homeDatas.findOne({});
  const role = [req.body.role];
  if (!Data) {
    await homeDatas.insertOne({ roles: role });
  } else {
    await homeDatas.updateOne(
      { _id: Data._id },
      { roles: [...Data.roles, ...role] }
    );
  }
  res.redirect("/home");
});

route.post("/editRole/:id", async (req, res) => {
  const Data = await homeDatas.findOne({});
  const toedit = req.params.id;
  console.log(toedit, "toedit ind");

  res.redirect("/home");
});

route.use("/deleteRole/:id", async (req, res) => {
  const Data = await homeDatas.findOne({});
  const toedit = req.params.id;
  const updatedRoles =
    Data &&
    Data.length != 0 &&
    Data.roles.filter((item, index) => index != toedit);
  await homeDatas.updateOne({ _id: Data._id }, { roles: updatedRoles });

  res.redirect("/home");
});
module.exports = route;
