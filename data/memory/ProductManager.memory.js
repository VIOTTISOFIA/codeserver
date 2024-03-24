const fs = require("fs");
const crypto = require("crypto");
const { error } = require("console");

class ProductManager {
  static #products = [];
  create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "images/package.png",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error("Producto no creado. Ingrese los datos correctos");
      } else {
        ProductManager.#products.push(product);
        console.log("Producto creado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new error("No existen productos");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const find = ProductManager.#products.find((each) => each.id === id);
      if (!find) {
        throw new Error(
          "El producto que buscas no existe. Verifica el dato proporcionado e intentalo nuevamente."
        );
      } else {
        return find;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      this.readOne(id);
      const filtered = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      ProductManager.#products = filtered;
      console.log("Producto encontrado");
    } catch (error) {
      console.log(error + "verifique nuevamente");
    }
  }
}

function prueba() {
  const gestorDeProductos = new ProductManager();

  gestorDeProductos.create({
    title: "chupete",
    category: "chupetes",
    price: 1500,
    stock: 1000,
  });

  gestorDeProductos.create({
    title: "conjunto enterizo unisex",
    category: "indumentaria",
    price: 900,
    stock: 800,
  });

  gestorDeProductos.create({
    title: "porta chupetes",
    category: "accesorios",
    price: 750,
    stock: 15,
  });

  gestorDeProductos.create({
    title: "practicuna",
    category: "muebles",
    price: 2500,
    stock: 600,
  });

  gestorDeProductos.create({
    title: "pañalera Verona",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  gestorDeProductos.create({
    title: "set corta uñas",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  gestorDeProductos.create({
    title: "Set toalla y cambiador despues del baño",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  gestorDeProductos.create({
    title: "zapatos tejidos Sandia",
    category: "calzado",
    price: 15000,
    stock: 250,
  });

  gestorDeProductos.create({
    title: "cardigan tejido a mano",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

  gestorDeProductos.create({
    title: "pijama disfraz de monstruo 6M",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

  console.log("Productos creados:");
  console.log(gestorDeProductos.read());
  
  const productId = "123";
  
  try {
    const deleteProduct = gestorDeProductos.readOne(productId);
    if (deleteProduct) {
      gestorDeProductos.destroy(productId);
      console.log(`Producto "${deleteProduct.title}" eliminado satisfactoriamente.`);
      console.log("Productos después de la eliminación:");
      console.log(gestorDeProductos.read());
    } else {
      console.log(`El producto "${productId}" no existe en la lista. Intentalo nuevamente`);
    }
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error.message);
  }

}

prueba();
