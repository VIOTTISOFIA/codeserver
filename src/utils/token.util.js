import jwt from "jsonwebtoken";

const createToken = (data) => {
<<<<<<< HEAD
  const opts = { expiresIn: 60 * 60 * 24 };
=======
  const opts = { expiresIn: 60 * 5 };
>>>>>>> 1426f7f4e4ffd999aa3faa62f700b16383b255e5
  const token = jwt.sign(data, process.env.SECRET_JWT, opts);
  return token;
};

const verifyToken = (token) => {
<<<<<<< HEAD
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data;
};
=======
  console.log("token verificado: ",token)
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data;
};

>>>>>>> 1426f7f4e4ffd999aa3faa62f700b16383b255e5
export { createToken, verifyToken };
