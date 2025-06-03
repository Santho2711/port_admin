const mongoose = require("mongoose");

const contactContentschema = mongoose.Schema({
  email: {
    type: String,
    require: false,
  },
  mobile: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: false,
  },
});

const contactContentCollection = mongoose.model(
  "ContactContent",
  contactContentschema
);

module.exports = contactContentCollection;
