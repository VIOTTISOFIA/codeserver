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

   gestorDeProductos.create({
    title: "Peluche de cebra con sonido",
    category: "jugueteria",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Set de herramientas para taller",
    category: "jugueteria",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Bicicleta con rueditas de apoyo",
    category: "deportes",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Casa de muñecas",
    category: "jugueteria",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Patines princesas Disney de 4 ruedas",
    category: "deportes",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Zapatillas con luces HotWheels",
    category: "calzado",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Set de vinchas con brillos",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Camisa manga larga para nene",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Pantalon de vestir nene colores surtidos",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Cinturon de princesas",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

   gestorDeProductos.create({
    title: "Cinturon de MarioBros",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  console.log("Productos creados:");
  console.log(gestorDeProductos.read());
  
  const productId = "chupete";
  
  try {
    const deleteProduct = gestorDeProductos.readOne(productId);
    if (deleteProduct) {
      gestorDeProductos.destroy(productId);
      console.log(`Producto con ID "${productId}" eliminado satisfactoriamente.`); 
      console.log("Productos después de la eliminación:");
      console.log(gestorDeProductos.read());
    } else {
      console.log(`El producto con ID "${productId}" no existe en la lista. Inténtalo nuevamente`);
    }
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error.message);
  }
}

prueba();
