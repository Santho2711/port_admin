const mongoose = require("mongoose");

const skillschema = mongoose.Schema({
  skill: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
});

const skillCollection = mongoose.model("Skills", skillschema);

module.exports = skillCollection;
