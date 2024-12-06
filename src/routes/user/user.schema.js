import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("users", schema);

export default User;
