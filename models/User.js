const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name : String,
    spotifyID : String,
    spotifyProduct : String
})



const User = model("User", userSchema);
module.exports = User;