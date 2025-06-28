const mongoose = require("mongoose");

const ConnectDataBase = async () => {
  const dbName = "SanthoshAdmin";
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${dbName}`)
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e, "Error in Database connection"));
};

module.exports = { ConnectDataBase };
