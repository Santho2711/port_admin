require("express-handlebars");
module.exports = {
  eq: function (a, b) {
    return a == b;
  },
  baseUrl: () => process.env.BASE_URL,
};

