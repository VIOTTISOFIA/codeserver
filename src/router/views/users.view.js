import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
// import userManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTER" });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", { title: "LOGIN" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { email } = req.session;
    const user = await userManager.readByEmail(email);
    console.log(user);
    return res.render("profile", { user });
  } catch (error) {
    return next(error);
  }
});
// usersRouter.get("/", async (req, res, next) => {
//   try {
//     // Asegúrate de que estás accediendo al objeto usuario almacenado en la sesión
//     const user = req.session.user;

//     // Verificación adicional para asegurar que el usuario esté presente
//     if (!user) {
//       throw new Error("Usuario no autenticado");
//     }

//     console.log(user.email); // Verifica que tienes el correo electrónico
//     return res.render("profile", { user });
//   } catch (error) {
//     return next(error);
//   }
// });

// usersRouter.get("/:uid", async (req, res, next) => {
//   try {
//     const { uid } = req.params;
//     const one = await userManager.readOne(uid);
//     console.log(one);

//     return res.render("profile", { user: one });
//   } catch (error) {
//     return next(error);
//   }
// });
export default usersRouter;
