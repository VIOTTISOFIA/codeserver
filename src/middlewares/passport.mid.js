import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../data/mongo/managers/UserManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

//ESTRATEGIA PARA REGISTER
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },

    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new Error("Please enter email and passsword");
          error.statusCode = 400;
          return done(error);
        }

        const one = await userManager.readByEmail(email);
        if (one) {
          const error = new Error("Bad auth from register!");
          error.statusCode = 401;
          return done(error);
        }

        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const user = await userManager.create(req.body);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//ESTRATEGIA PARA LOGIN
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },

    async (req, email, password, done) => {
      try {
        const one = await userManager.readByEmail(email);
        console.log("Estrategia login", req.session);

        if (!one) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(error);
        }

        const verify = verifyHash(password, one.password);
        if (verify) {
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            _id: one._id,
            online: true,
          };

          console.log(user);
          const token = createToken(user);
          user.token = token;
          console.log("user tokenizado", user);

          return done(null, user);
          //agrega la prop USER al obj de req
          //esa prop USER tiene todas las props que se definen en el obj correspondiente
        }

        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
