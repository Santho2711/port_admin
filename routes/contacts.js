const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const contactCollection = require("../models/contactModel");
const contactContentCollection = require("../models/contactContentModel");

route.get("/content", async (req, res, next) => {
  const datas = await contactContentCollection.findOne({}).lean();

  res.render(path.join(rootPath, "views", "contactManage"), {
    title: "contact contents",
    datas,
  });
});

route.post("/content", async (req, res, next) => {
  const verify = req?.body?.id;
  const toUpload = {
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
  };
  if (verify) {
    console.log(verify, toUpload);
    await contactContentCollection.updateOne({ _id: verify }, toUpload);
  } else if (!verify) {
    toUpload && (await contactContentCollection.insertOne(toUpload));
  }
  res.redirect("/contacts/content");
});

route.get("/reached", async (req, res, next) => {
  const datas = await contactCollection.find({}).lean();

  res.render(path.join(rootPath, "views", "contactReached"), {
    title: "Reached contacts",
    datas,
  });
});

module.exports = route;
