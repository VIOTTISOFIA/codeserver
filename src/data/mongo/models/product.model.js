import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
<<<<<<< HEAD
    user_id: {type: Types.ObjectId, ref: "users", index: true, required: true },
=======
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
>>>>>>> dbe085a462d531720a7c45027adc379b15126d01
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
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {this.populate("user_id", "email photo -_id")})
schema.pre("findOne", function () {this.populate("user_id", "email")})
//schema.pre("findOneAndDelete", function () {this.populate("user_id", "email")})
//schema.pre("findOneAndUpdate", function () {this.populate("user_id", "email")})

const Product = model(collection, schema);
export default Product;
