import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
<<<<<<< HEAD
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, default: 12 },
    // password: data.password,
    role: { type: String, required: true, index: true },
=======
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
    photo: {
      type: String,
      default: "https://www.pngplay.com/image/325510",
    },
<<<<<<< HEAD
=======
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 12 },
    // password: data.password,
    role: { type: String, required: true },
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);
export default User;
