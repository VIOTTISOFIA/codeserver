import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];
  create(data) {
    try {
      // const product = {
      //   id: crypto.randomBytes(12).toString("hex"),
      //   title: data.title,
      //   photo: data.photo || "images/package.png",
      //   category: data.category,
      //   price: data.price,
      //   stock: data.stock,
      // };

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
        throw new Error("No existen productos");
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
      console.log(find);
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

  update(id, data) {
    try {
      this.readOne(id);
      const one = ProductManager.#products.find((product) => product.id === id);
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
      console.error("Error al actualizar el producto:", error.message);
      throw error;
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

  gestorDeProductos.create({
    title: "Buzo talle 2 Frozen",
  });

  gestorDeProductos.create({
    title: "Muñeco Buzz Lightyear con sonido",
  });

  gestorDeProductos.create({
    title: "Remera talle 4 F1 Ferrari",
  });

  gestorDeProductos.create({
    title: "Conjunto talle 3 AFA",
  });

  gestorDeProductos.create({
    title: "Vestido con lazos de fiesta talle 2",
  });

  gestorDeProductos.create({
    title: "Sandalias rosas para nena",
  });

  gestorDeProductos.create({
    title: "Coche Carestino reclinable a 3 niveles",
  });

  gestorDeProductos.create({
    title: "Asiento elevador Carestino para niños",
  });

  gestorDeProductos.create({
    title: "Butaca de viaje Carestino con giro 360°",
  });

  gestorDeProductos.create({
    title: "Sillita mecedora Carestino para siestas",
  });

  gestorDeProductos.create({
    title: "Sacaleche electrico con mamadera",
  });

  gestorDeProductos.create({
    title: "Mamadera Avent 12onz",
  });

  gestorDeProductos.create({
    title: "Bañera plegable con soporte para Recien nacidos",
  });

  gestorDeProductos.create({
    title: "Silla de comedor con juguete unisex",
  });

  gestorDeProductos.create({
    title: "xCombo mosquitero + protector de lluvia para cochecitos",
  });

  gestorDeProductos.create({
    title: "Cochecito SMARTDUO Carestino",
  });

  gestorDeProductos.create({
    title: "Mochila portabebes",
  });

  gestorDeProductos.create({
    title: "Gimnasio didactico multifuncion",
  });

  gestorDeProductos.create({
    title: "Mecedor de caballito de madera",
  });

  console.log("Productos creados:");
  console.log(gestorDeProductos.read());

  const productId = "chupete";

  try {
    const deleteProduct = gestorDeProductos.readOne(productId);
    if (deleteProduct) {
      gestorDeProductos.destroy(productId);
      console.log(
        `Producto con ID "${productId}" eliminado satisfactoriamente.`
      );
      console.log("Productos después de la eliminación:");
      console.log(gestorDeProductos.read());
    } else {
      console.log(
        `El producto con ID "${productId}" no existe en la lista. Inténtalo nuevamente`
      );
    }
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error.message);
  }
}

//prueba();
