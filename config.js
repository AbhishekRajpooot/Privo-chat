import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect("mongodb://localhost:27017/Privo_Area"),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  console.log("DB is connected");
};
