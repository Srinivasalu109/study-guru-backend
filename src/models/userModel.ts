import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // branch: { type: String, required: false },
});

var User = mongoose.model("UserSchema", userSchema);

export default User;
