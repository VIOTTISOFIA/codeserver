import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    photo: {
      type: String,
      default: "https://www.pngplay.com/image/325510",
    },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 12 },
    // password: data.password,
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model(collection, Schema);
export default User;
