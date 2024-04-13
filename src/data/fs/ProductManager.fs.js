import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/file/Products.json";
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
      if ( !data.title ) {
        throw new Error("Producto no creado. Ingrese los datos correctos");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "images/package.png",
          category: data.category || "NOT DEFINED",
          price: data.price || "1",
          stock: data.stock || "1",
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
      all = JSON.parse(all);
      category && (all = all.filter((each) => each.category === category));
      return all;
    } catch (error) {
      console.error("Error al obtener los datos");
      throw error;
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let found = all.find((product) => product.id === id);
      if (!found) {
        throw new Error("El producto que buscas no existe.");
      }
        return found;
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
      all = JSON.parse(all);
      let one = all.find((product) => product.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fspromises.writeFile(this.path, all);
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
    title: "Buzo talle 2 Frozen"
  });

  await gestorDeProductos.create({
    title: "Muñeco Buzz Lightyear con sonido"
  });

  await gestorDeProductos.create({
    title: "Remera talle 4 F1 Ferrari"
  });

  await gestorDeProductos.create({
    title: "Conjunto talle 3 AFA"
  });

  await gestorDeProductos.create({
    title: "Vestido con lazos de fiesta talle 2"
  });

  await gestorDeProductos.create({
    title: "Sandalias rosas para nena"
  });

  await gestorDeProductos.create({
    title: "Coche Carestino reclinable a 3 niveles"
  });

  await gestorDeProductos.create({
    title: "Asiento elevador Carestino para niños"
  });

  await gestorDeProductos.create({
    title: "Butaca de viaje Carestino con giro 360°"
  });

  await gestorDeProductos.create({
    title: "Sillita mecedora Carestino para siestas"
  });

  await gestorDeProductos.create({
    title: "Sacaleche electrico con mamadera"
  });

  await gestorDeProductos.create({
    title: "Mamadera Avent 12onz"
  });

  await gestorDeProductos.create({
    title: "Bañera plegable con soporte para Recien nacidos"
  });

  await gestorDeProductos.create({
    title: "Silla de comedor con juguete unisex"
  });

  await gestorDeProductos.create({
    title: "xCombo mosquitero + protector de lluvia para cochecitos"
  });

  await gestorDeProductos.create({
    title: "Cochecito SMARTDUO Carestino"
  });

  await gestorDeProductos.create({
    title: "Mochila portabebes"
  });

  await gestorDeProductos.create({
    title: "Gimnasio didactico multifuncion"
  });

  await gestorDeProductos.create({
    title: "Mecedor de caballito de madera"
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