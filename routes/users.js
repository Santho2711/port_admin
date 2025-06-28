const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const userCollection = require('../models/userModel')
require('dotenv').config();

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
  console.log(process.env.BASE_URL,"env");
  res.render(path.join(rootPath, "views", "usersAdd"), {
    title: "Add User",
  });
});
route.post("/add", async (req, res, next) => {
  const verify = req?.body?.id;
  const toAdd = {
    username: req?.body?.user_name,
    email: req?.body?.user_mail,
    password: req?.body?.user_password,
  };
  if(verify){
    await userCollection.updateOne({ _id: verify }, toAdd);
  }
  else{
    await userCollection.insertOne(toAdd);
  }
  res.redirect('/users/manage')
});

route.get("/manage", async (req, res, next) => {
  const users = await userCollection.find({}).lean()
  res.render(path.join(rootPath, "views", "usersManage"), {
    title: "Manage Users",
    datas:users
  });
});


route.get("/edit/:id", async (req, res, next) => {
  const datas = await userCollection.findOne({ _id: req.params.id }).lean();

  res.render(path.join(rootPath, "views", "usersAdd"), {
    title: "Edit your Project",
    datas,
  });
});

route.get("/delete/:id", async (req, res, next) => {
  req.params.id && (await userCollection.deleteOne({ _id: req.params.id }));
  setTimeout(() => {
    res.redirect("/users/manage");
  }, 2000);
});
  
module.exports = route;
