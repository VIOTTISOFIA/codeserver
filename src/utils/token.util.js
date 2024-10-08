import jwt from "jsonwebtoken";

const createToken = (data) => {
  const opts = { expiresIn: 60 * 30 };
  const token = jwt.sign(data, process.env.SECRET_JWT, opts);
  return token;
};

const verifyToken = (token) => {
  console.log("token verificado: ", token);
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data;
};

export { createToken, verifyToken };
