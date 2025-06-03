const mongoose = require("mongoose");

const backgroundschema = mongoose.Schema({
  designation: {
    type: String,
    require: false,
  },
  organisation: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
  fromDate: {
    type: String,
    require: false,
  },
  toDate: {
    type: String,
    require: false,
  },
  backgroundType: {
    type: String,
    require: false,
  },
});

const backgroundCollection = mongoose.model("Background", backgroundschema);

module.exports = backgroundCollection;
