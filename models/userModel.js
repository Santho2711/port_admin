const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  username: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: false,
  },
});

const userCollection = mongoose.model("Users", userschema);

module.exports = userCollection;
