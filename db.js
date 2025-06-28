const mongoose = require("mongoose");

const ConnectDataBase = async () => {
  const dbName = "test";
  mongoose
    .connect(
      `mongodb+srv://santhosh2711kumar:Santho2711@santhoshadmin.3jims51.mongodb.net/${dbName}`
    )
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e, "Error in Database connection"));
};

module.exports = { ConnectDataBase };
