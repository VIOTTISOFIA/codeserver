//const fs = require("fs");
//const crypto = require("crypto");
import fs from "fs";
import crypto from "crypto";

class CartsManager {
  static #carts = [];
  create(data) {
    try {
      if (!data) {
        throw new Error("Not found!");
      } else {
        CartsManager.#carts.push(data);
        console.log(cart);
      }
    } catch (error) {
      console.log(error);
    }
  }

  read() {
    try {
      if (CartsManager.#carts.length === 0) {
        throw new Error("Not exist a product!");
      } else {
        return CartsManager.#carts;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(state) {
    try {
      const find = CartsManager.#carts.find((cart) => cart.state === state);
      if (!find) {
        throw new Error("Not found! Try again.");
      } else {
        return find;
      }
    } catch (error) {
      console.log(error);
    }
  }

  destroy(state) {
    try {
      this.readOne(state);
      const find = CartsManager.#carts.filter((cart) => cart.state !== state);
      CartsManager.#carts = find;
      console.log("Found");
    } catch (error) {
      console.log(error + "try again");
    }
  }

  update(state, data) {
    try {
      this.readOne(state);
      const one = CartsManager.#carts.find((cart) => cart.state === state);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
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

function test() {
  const gestorDeCarts = new CartsManager();

  gestorDeCarts.create({
    quantity: "2",
  });

  gestorDeCarts.create({
    quantity: "5",
    state: "paid",
  });

  gestorDeCarts.create({
    quantity: "4",
    state: "delivered",
  });

  console.log("Productos creados:");
  console.log(gestorDeCarts.read());

  const productState = "reserved";
  const updateState = "paid";
  try {
    const updateProduct = gestorDeCarts.readOne(productState);
    if (updateProduct) {
      gestorDeCarts.update(productState, { state: updateState });
      console.log(
        `Producto con estado "${productState}" actualizado satisfactoriamente.`
      );
      console.log("Productos después de la actualización:");
      console.log(gestorDeCarts.read());
    } else {
      console.log(
        `El producto con estado "${productState}" no existe en la lista. Inténtalo nuevamente`
      );
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
  }

  /* 
      try {
        const deleteProduct = gestorDeCarts.readOne(productState);
    if (deleteProduct) {
        gestorDeCarts.destroy(productState);
      console.log(
        `Producto con estado "${productState}" eliminado satisfactoriamente.`
      );
      console.log("Productos después de la eliminación:");
      console.log(gestorDeCarts.read());
    } else {
      console.log(
        `El producto con estado "${productState}" no existe en la lista. Inténtalo nuevamente`
      );
    }
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error.message);
  } */
}

//test();

const cartsManager = new CartsManager();
export default cartsManager;
