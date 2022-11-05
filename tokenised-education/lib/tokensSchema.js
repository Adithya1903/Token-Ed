import mongoose, { Schema } from "mongoose";



const tokenSchema = new mongoose.Schema(
  {
    profile: {
        type: String
    }
  }
);

let Tokens = mongoose.models.tokens || mongoose.model("tokens", tokenSchema);


export default Tokens;
