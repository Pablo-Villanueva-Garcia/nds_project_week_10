require("dotenv").config();
const mongoose = require("mongoose");
const password = process.env.MONGOPASSWORD;
mongoose
  .connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const User = mongoose.model("user", {
  email:String,
  password:String,
  token:String,
});

module.exports = {
  User,
};