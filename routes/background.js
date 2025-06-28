const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const backgroundCollection = require("../models/backgroundModel");

route.get("/", async (req, res, next) => {
  res.render(path.join(rootPath, "views", "backgroundAdd"), {
    title: "Add your Background",
  });
});

route.get("/add", async (req, res, next) => {
  res.render(path.join(rootPath, "views", "backgroundAdd"), {
    title: "Add your Background",
  });
});
route.post("/add", async (req, res, next) => {
  const backgroundDatas = await backgroundCollection.find({}).lean();
  const verify = req?.body?.id;
  const toUpload = {
    designation: req?.body?.designation,
    organisation: req?.body?.organisation,
    description: req?.body?.description,
    fromDate: req?.body?.from_date,
    toDate: req?.body?.to_date,
    backgroundType: req?.body?.backgroundtype,
  };
  if (verify) {
    await backgroundCollection.updateOne({ _id: verify }, toUpload);
  } else if (!verify) {
    toUpload && (await backgroundCollection.insertOne(toUpload));
  }

  res.redirect("/background/manage");
});

route.get("/manage", async (req, res, next) => {
  const datas = await backgroundCollection.find({}).lean();
  res.render(path.join(rootPath, "views", "backgroundManage"), {
    title: "Manage your Background",
    datas,
  });
});

route.get("/edit/:id", async (req, res, next) => {
  const datas = await backgroundCollection
    .findOne({ _id: req.params.id })
    .lean();

  res.render(path.join(rootPath, "views", "backgroundAdd"), {
    title: "Edit your Background",
    datas,
  });
});

route.get("/delete/:id", async (req, res, next) => {
  req.params.id &&
    (await backgroundCollection.deleteOne({ _id: req.params.id }));
  setTimeout(() => {
    res.redirect("/background/manage");
  }, 2000);
});
module.exports = route;
