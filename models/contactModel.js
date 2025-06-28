const mongoose = require("mongoose");

const contactschema = mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: false,
  },
  mobile: {
    type: String,
    require: false,
  },
  purpose: {
    type: String,
    require: false,
  },
  message: {
    type: String,
    require: false,
  },
});

const contactCollection = mongoose.model("Contact", contactschema);

module.exports = contactCollection;
