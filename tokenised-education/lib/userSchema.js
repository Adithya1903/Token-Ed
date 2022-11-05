import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
    },
    publicAddress: {
      type: String,
    },
    accountType: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;