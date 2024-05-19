import { Schema, model } from "mongoose";

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
    },
    price: { type: Number, default: "1" },
    stock: { type: Number, default: "1" },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;
