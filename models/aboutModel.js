const mongoose = require("mongoose");

const aboutchema = mongoose.Schema({
  pageTitle: {
    type: String,
    require: false,
  },
  keys: {
    type: [{ type: String, require: true }],
    require: false,
  },
  leftimage: {
    type: String,
    require: false,
  },
  subparagraph: {
    type: String,
    require: false,
  },
  title_one: {
    type: String,
    require: false,
  },
  title_two: {
    type: String,
    require: false,
  },
  title_three: {
    type: String,
    require: false,
  },
  paragraph_one: {
    type: String,
    require: false,
  },
  paragraph_two: {
    type: String,
    require: false,
  },
  paragraph_three: {
    type: String,
    require: false,
  },
});

const aboutCollection = mongoose.model("About", aboutchema);

module.exports = aboutCollection;
