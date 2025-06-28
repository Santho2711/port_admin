const mongoose = require("mongoose");

const homeschema = mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  roles: {
    type: [{ type: String, require: true }],
    require: false,
  },
  resume: {
    type: String,
    require: false,
  },
});

const homeCollection = mongoose.model("Home", homeschema);

module.exports = homeCollection;
