const mongoose = require("mongoose");

const ConnectDataBase = async () => {
  const dbName = "SanthoshAdmin";
  const uri =
    "mongodb+srv://santhosh2711kumar:<db_password>@santhoshadmin.3jims51.mongodb.net/?retryWrites=true&w=majority&appName=SanthoshAdmin";
  mongoose
    .connect(
      `mongodb+srv://santhosh2711kumar:UZBpcDK6uNnDBOLF@santhoshadmin.3jims51.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`
    )
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e, "Error in Database connection"));
};

module.exports = { ConnectDataBase };
