import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  photo: Joi.string()
    .uri()
    .allow("")
    .default("https://i.postimg.cc/pVcL6v4t/package.png"),
  category: Joi.string()
    .valid(
      "Not defined",
      "Accesorios",
      "Indumentaria",
      "Muebles",
      "Calzado",
      "Jugueteria",
      "Deportes"
    )
    .allow("")
    .default("Not defined")
    .messages({
      "any.only": "The category must be one of the following: Accesorios, Indumentaria, Muebles, Calzado, Jugueteria, Deportes or empty for default.",
    }),
  price: Joi.number()
    .positive()
    .precision(2)
    .allow("")
    .default(1),
  stock: Joi.number().integer().min(1).allow("").default(1),
});

export default productSchema;
