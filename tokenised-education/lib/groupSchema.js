import mongoose, { Schema } from "mongoose";
import Professors from "./professorSchema";
import Students from "./studentSchema";
import Opportunities from "./opportunitySchema";
const groupSchema = new mongoose.Schema(
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      students: [{
        type: Schema.Types.ObjectId,
        ref: "Students"
      }],
      opportunities: [{
          type: Schema.Types.ObjectId,
          ref: "Opportunities"
      }],
      status: {
        type: Number
      },
      vault: {
        type: String
      },
      name : {
        type: String
      }
    }
  );

let Groups = mongoose.models.groups || mongoose.model("groups", groupSchema);


export default Groups;
