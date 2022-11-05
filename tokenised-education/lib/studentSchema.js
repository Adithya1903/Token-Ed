import mongoose, { Schema } from "mongoose";
import Users from "./userSchema";
import Groups from "./groupSchema";
import Tokens from "./tokensSchema";

const studentSchema = new mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
      },
      groups: [{
        type: Schema.Types.ObjectId,
        ref: "Groups"
      }],
      tokens: [{
          type: Schema.Types.ObjectId,
          ref: "Tokens"
      }],
      profile: {
          type: String
      },
      gpa: {
        type: String
    },
    bio: {
        type: String
    },
    email: {
        type: String
    }
    }
  );

let Students = mongoose.models.students || mongoose.model("students", studentSchema);


export default Students;
