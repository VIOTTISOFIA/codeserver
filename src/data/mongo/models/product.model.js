import { Schema, Types, model } from "mongoose";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/pVcL6v4t/package.png",
    },
    category: {
      type: String,
      default: "Not defined",
      enum: [
        "Not defined",
        "Accesorios",
        "Indumentaria",
        "Muebles",
        "Calzado",
        "Jugueteria",
        "Deportes",
      ],
    index: true},
    price: { type: Number, default: "1" },
    stock: { type: Number, default: "1" },
    user_id: {type: Types.ObjectId, ref: "users", index: true, required: true },
    user: {type: String, required: true }
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {this.populate("user_id", "email photo -_id")})
schema.pre("findOne", function () {this.populate("user_id", "email")})
//schema.pre("findOneAndDelete", function () {this.populate("user_id", "email")})
//schema.pre("findOneAndUpdate", function () {this.populate("user_id", "email")})

const Product = model(collection, schema);
export default Product;
