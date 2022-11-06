import mongoose, { Schema } from "mongoose";
import Students from "./studentSchema";
import Groups from "./groupSchema";
import Tokens from "./tokensSchema";

const opportunitySchema = new mongoose.Schema({
  joined_students: {
    type: Schema.Types.ObjectId,
    ref: "Students",
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
  },
  tokens: [
    {
      type: Number,
    },
  ],
  accepted_students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
  description: {
    type: String,
  },
  name: {
    type: String,
  },
});

let Opportunities =
  mongoose.models.opportunities ||
  mongoose.model("opportunities", opportunitySchema);

export default Opportunities;
