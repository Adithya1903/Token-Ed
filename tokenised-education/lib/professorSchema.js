import mongoose, { Schema } from "mongoose";
import Users from "./userSchema";
import Groups from "../groupSchema";
import Tokens from "./tokensSchema";


const professorSchema = new mongoose.Schema(
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
      }]
    }
  );

let Professors = mongoose.models.professors || mongoose.model("professors", professorSchema);


export default Professors;
