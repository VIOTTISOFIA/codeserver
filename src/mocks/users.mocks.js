import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import usersRepository from "../repositories/users.rep.js";
// import userManager from "../data/mongo/managers/UserManager.mongo.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 100; i++) {
      const email = faker.internet.email();
      const password = "hola1234";
      const photo = faker.image.avatar();
      const user = { email, password, photo };
      await usersRepository.createRepository(user);
    }
    console.log("Users created");
  } catch (error) {
    console.log(error);
  }
}

createData();

// import "../utils/env.util.js";
// import { faker } from "@faker-js/faker";
// import dbConnect from "../utils/dbConnect.util.js";
// // import usersRepository from "../repositories/users.rep.js";
// import userManager from "../data/mongo/managers/UserManager.mongo.js";

// async function createData() {
//   try {
//     dbConnect();
//     for (let i = 1; i <= 100; i++) {
//       const email = faker.internet.email();
//       const password = "hola1234";
//       const photo = faker.image.avatar();
//       const verifyCode = faker.string.uuid(); // Genera un código de verificación aleatorio
//       const user = { email, password, photo, verifyCode };
//       await userManager.create(user);
//     }
//     console.log("Users created");
//   } catch (error) {
//     console.log(error);
//   }
// }

// createData();
