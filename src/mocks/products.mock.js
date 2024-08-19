import "../utils/env.util.js";
import dbConnect from "../utils/dbConnect.util.js";
import { faker } from "@faker-js/faker";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
  try {
    dbConnect()
    for (let i = 1; i <=10; i++) {
      const product = {
        title: faker.commerce.product(),
        photo: faker.image.urlLoremFlickr({ category: 'sports' }),
        category: faker.commerce.productAdjective(),
        price: faker.number.binary(255),
        stock: faker.number.binary(255),
      };
      await productsRepository.createRepository(product);
    }
    console.log("Products created");
  } catch (error) {
    console.log(error);
  }
}

createData()