import fs from "fs";
import crypto from "crypto";

class CartsManager {
  constructor() {
    this.path = "./src/data/fs/file/Carts.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado!");
    } else {
      console.log("archivo ya existe!");
    }
  }

  async create(data) {
    try {
      let cart;
      if (!cart) {
        const cart = {
          user_id: crypto.randomBytes(12).toString("hex"),
          product_id: crypto.randomBytes(12).toString("hex"),
          quantity: data.quantity || "1",
          state: data.state || "reserved",
        };

        let carts = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(carts);
        carts.push(cart);
        console.log("Created");
        carts = JSON.stringify(carts, null, 2);
        await fs.promises.writeFile(this.path, carts);
        return cart;
      } else {
        throw new Error("Not found!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async read(state) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      state && (all = all.filter((each) => each.state === state));
      return all;
    } catch (error) {
      console.error("Error al obtener los datos");
      throw error;
    }
  }

  async readOne(user_id) {
    try {
      let one = await fs.promises.readFile(this.path, "utf-8");
      one = JSON.parse(one);
      let found = one.find((cart) => cart.user_id === user_id);
      if (!found) {
        throw new Error("Not found! Try again.");
      }
      return found;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async destroy(state) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      const one = all.find((cart) => cart.state === state);
      if (!one) {
        throw new Error("Not found!");
      } else {
        let filtered = all.filter((cart) => cart.state !== state);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(
          `El producto con estado "${state}" fue encontrado y eliminado satisfactoriamente`
        );
        return one;
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }

  async update(state, data) {
    try {
      let all = await this.read();
      let one = all.find((cart) => cart.state === state);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.error(error.message + "Try again!");
      throw error;
    }
  }
}

async function test() {
  const gestorDeCarts = new CartsManager();
  
 /*  await gestorDeCarts.create({
    quantity: "2",
  });

  await gestorDeCarts.create({
    quantity: "5",
    state: "paid",
  });

  await gestorDeCarts.create({
    quantity: "4",
    state: "delivered",
  }); */

  console.log(await gestorDeCarts.read());
  //console.log(await gestorDeCarts.readOne("103afd77d65cef61b42e0dbe"))

  //METODO UPDATE
  const cartState = "reserved";
  const updateState = { state: "paid" };
  try {
    const updatedCart = await gestorDeCarts.update(cartState, updateState);
    console.log("Carrito actualizado:", updatedCart);
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
  }

  console.log("Carritos después de la actualización:");
  console.log(await gestorDeCarts.read());
 
  //console.log(await gestorDeCarts.destroy("delivered"))
}

//test();

const cartsManager = new CartsManager();
export default cartsManager;

//AGREGAR METODOS FALTANTES DE MONGO
