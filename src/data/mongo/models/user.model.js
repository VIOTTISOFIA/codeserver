import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, default: 12 },
    // password: data.password,
    role: { type: String, required: true, index: true },
    photo: {
      type: String,
      default: "https://www.pngplay.com/image/325510",
    },
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);
export default User;
