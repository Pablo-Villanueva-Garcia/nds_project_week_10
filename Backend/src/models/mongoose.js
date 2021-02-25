require("dotenv").config();
const mongoose = require("mongoose");
const password = process.env.MONGOPASSWORD;
mongoose
  .connect("mongodb://db:27017/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const User = mongoose.model("users", {
  email:String,
  password:String,
  token:String,
});

module.exports = {
  User,
};