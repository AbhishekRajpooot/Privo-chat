import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});
export const chatModel = mongoose.model("Privo Area", chatSchema);
