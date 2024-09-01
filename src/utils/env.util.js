import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;
const path = env === "prod" ? "./.env.prod" : "./.env.dev";
//si env es dev debo usar env.dev
//si env es prod debo usar env.prod

config({ path });

const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

export default environment;
