import Joi from "joi-oid";

const usersSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": "El email es requerido.",
      "string.empty": "El email no puede ser una cadena de texto vacía.",
      "string.email": "El email debe ser válido.",
      "string.min": "El email tiene que tener mínimo 3 letras.",
      "string.max": "El email tiene que tener máximo 50 letras.",
    }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$"))
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": "La contraseña es requerida.",
      "string.empty": "La contraseña no puede ser una cadena de texto vacía.",
      "string.pattern.base":
        "La contraseña debe ser alfanumérica con minúsculas y MAYÚSCULAS.",
      "string.min": "La contraseña tiene que tener mínimo 3 caracteres.",
      "string.max": "La contraseña tiene que tener máximo 50 caracteres.",
    }),
  age: Joi.number()
    .integer()
    .min(0)
    .messages({
      "number.base": "La edad debe ser un número.",
      "number.integer": "La edad debe ser un número entero.",
      "number.min": "La edad no puede ser negativa.",
    })
    .allow("")
    .default(18),
  photo: Joi.string().uri(),
  role: Joi.number(),
  verify: Joi.boolean(),
  verifyCode: Joi.string(),
});

export default usersSchema;
