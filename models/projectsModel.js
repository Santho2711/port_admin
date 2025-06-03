const mongoose = require("mongoose");

const projectschema = mongoose.Schema({
  projectName: {
    type: String,
    require: false,
  },
  projectUrl: {
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

const projectCollection = mongoose.model("Projects", projectschema);

module.exports = projectCollection;
