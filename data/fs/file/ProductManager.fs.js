const fs = require("fs");
const crypto = require("crypto");

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

  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      const allParsed = JSON.parse(all);
      console.log("Productos obtenidos: ", allParsed);
      return allParsed;
    } catch (error) {
      console.error("Error al obtener los datos");
      throw error;
    }
  }

  async readOne(title) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      const allParsed = JSON.parse(all);
      const found = allParsed.find((product) => product.title === title);
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

  async destroy(title) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      const allParsed = JSON.parse(all);
      const found = allParsed.find((each) => each.title === title);
      if (!found) {
        throw new Error("Producto no encontrado.");
      } else {
        let filtered = allParsed.filter((each) => each.title !== title);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Producto encontrado y eliminado satisfactoriamente");
        return found;
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
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

  await gestorDeProductos.read();
  //await gestorDeProductos.readOne(); - Esta linea nos genera un error al no tener parametro definido.
  await gestorDeProductos.readOne("chupete");
  await gestorDeProductos.destroy("chupete");
  //await gestorDeProductos.destroy("mochila"); - Esta linea nos genera un error al no existir este producto en el JSON
}

pruebaAsync();
