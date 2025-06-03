const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDataBase = async () => {
  const dbName = "SanthoshAdmin";
  mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e, "Error in Database connection"));
};

module.exports = { ConnectDataBase };
