const express = require("express");
const route = express.Router();
const app = express();
const rootPath = require("../utils/path");
const path = require("path");
const session = require("express-session");
const userCollection = require("../models/userModel");

route.get("/", (req, res) => {
  console.log(req.session.isAuth, "seessa authentic");
  if(req.session.isAuth){
    res.redirect("/dashboard");
  }
  else {
    res.render(path.join(rootPath, "views", "login"),{
      layout : 'authIndex'
    });
  }
});

route.post("/login", async (req, res) => {
  const {email,password} = req.body;
  const user = await userCollection.findOne({email:email})
  if(user && user.password == password){
    req.session.isAuth = true
    res.redirect("/dashboard");
  }
  else {
    res.redirect("/");
  }
});
route.get("/login", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/dashboard");
  }
  res.render(path.join(rootPath, "views", "login"), {
    layout: "authIndex",
  });
});
route.get("/register", (req, res) => {
  res.render(path.join(rootPath, "views", "register"), {
    layout: "authIndex",
  });
});


route.post("/register", async (req, res) => {
  const toUpload = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  const exists = await userCollection.find({ email: toUpload.email });
  if (exists.length > 0) {
    res.redirect("/register");
  } else {
    await userCollection.insertOne(toUpload);
    res.redirect("/dashboard");
  }
});
module.exports = route;
