import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import userManager from "../data/mongo/managers/UserManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
import crypto from "crypto";
import sendEmail from "../utils/mailing.util.js";

//ESTRATEGIA PARA REGISTER

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },

    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new Error("Please enter email and passsword");
          error.statusCode = 401;
          return done(null, null, error);
        }
        // verifico que el usuario no este registrado
        let one = await usersRepository.readByEmail(email);
        if (one) {
          const error = new Error("Bad auth from register!");
          error.statusCode = 401;
          return done(error);
        }
        // hasheamos el password
        const hashPassword = createHash(password);
        req.body.password = hashPassword;

        // creamos el usuario
        const data = new UsersDTO(req.body);
        user = await usersRepository.createRepository(data);
        // una vez que se creo el usuario
        // la estrategia debe enviar un correoelectronico
        // con el codigo aleatorio para la verificacion del usuario
        console.log(user);
        // Enviamos el email con código verificador
        await sendEmail({
          to: user.email,
          name: user.name,
          code: user.verifyCode,
        });

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
          // agrego la propiedad USER al objeto de requerimientos
          // esa propiedad USER tiene todas las propiedades que estamos definiendo en el objeto correspondiente
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

//ESTRATEGIA PARA JWT
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = new Error("Forbidden from Jwt!");
          error.statusCode = 403;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//ESTRATEGIA GOOGLE
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, accesToken, refreshToken, profile, done) => {
      try {
        // profile es el objecto que devuelve google con todos los datos del usuario
        // nosotros vamos a registrar un id en lugar de un email
        const { id, picture } = profile;
        console.log(profile);
        let user = await userManager.readByEmail(id);
        if (!user) {
          (user = {
            email: id,
            password: createHash(id),
            photo: picture,
          }),
            (user = await userManager.create(user));
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
