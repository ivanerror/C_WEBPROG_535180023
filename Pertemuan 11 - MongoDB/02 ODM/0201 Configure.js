const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://127.0.0.1:27017/ucafe-db",
    { useNewUrlParser: true }
);
const db = mongoose.connection;


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
