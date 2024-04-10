import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./data/fs/file/Products.json";
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
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error("Producto no creado. Ingrese los datos correctos");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "images/package.png",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };

        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async read(category) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      const allParsed = JSON.parse(all);
      category && (all = all.filter(each => each.category === category))
            return all
    } catch (error) {
      console.error("Error al obtener los datos");
      throw error;
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      const allParsed = JSON.parse(all);
      const found = allParsed.find((product) => product.id === id);
      if (!found) {
        throw new Error("El producto que buscas no existe.");
      } else {
        console.log(found);
        return found;
      }
    } catch (error) {
      console.error("Error al leer el producto:", error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      const allParsed = JSON.parse(all);
      const found = allParsed.find((each) => each.id === id);
      if (!found) {
        throw new Error("Producto no encontrado.");
      } else {
        let filtered = allParsed.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(
          `El producto con ID "${productId}" fue encontrado y eliminado satisfactoriamente`
        );
        return found;
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fspromises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("NOT FOUND")
        error.statusCode = 404
        throw error
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
      throw error;
    }
  }
}

async function pruebaAsync() {
  const gestorDeProductos = new ProductManager();

  await gestorDeProductos.create({
    title: "chupete",
    category: "chupetes",
    price: 1500,
    stock: 1000,
  });

  await gestorDeProductos.create({
    title: "conjunto enterizo unisex",
    category: "indumentaria",
    price: 900,
    stock: 800,
  });

  await gestorDeProductos.create({
    title: "porta chupetes",
    category: "accesorios",
    price: 750,
    stock: 15,
  });

  await gestorDeProductos.create({
    title: "practicuna",
    category: "muebles",
    price: 2500,
    stock: 600,
  });

  await gestorDeProductos.create({
    title: "pañalera Verona",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "set corta uñas",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set toalla y cambiador despues del baño",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "zapatos tejidos Sandia",
    category: "calzado",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "cardigan tejido a mano",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "pijama disfraz de monstruo 6M",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Peluche de cebra con sonido",
    category: "jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set de herramientas para taller",
    category: "jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Bicicleta con rueditas de apoyo",
    category: "deportes",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Casa de muñecas",
    category: "jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Patines princesas Disney de 4 ruedas",
    category: "deportes",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Zapatillas con luces HotWheels",
    category: "calzado",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set de vinchas con brillos",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Camisa manga larga para nene",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Pantalon de vestir nene colores surtidos",
    category: "indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Cinturon de princesas",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Cinturon de MarioBros",
    category: "accesorios",
    price: 15000,
    stock: 250,
  });
  await gestorDeProductos.read();
  //await gestorDeProductos.readOne(); - Esta linea nos genera un error al no tener parametro definido.
  //await gestorDeProductos.readOne("0ac63f253213dddb6869b6a4");
  //await gestorDeProductos.destroy("0ac63f253213dddb6869b6a4");
  //await gestorDeProductos.destroy("80047a"); - Esta linea nos genera un error al no existir este producto en el JSON
}

//pruebaAsync();

const productManager = new ProductManager();
export default productManager;
