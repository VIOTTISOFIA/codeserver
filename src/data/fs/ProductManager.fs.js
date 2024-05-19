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
          photo: data.photo || "https://i.postimg.cc/pVcL6v4t/package.png",
          category: data.category || "Not defined",
          price: data.price || "1",
          stock: data.stock || "1",
        };

        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      }
    } catch (error) {
      console.error(error);
      throw error;
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
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
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
      all = JSON.parse(all);
      const one = all.find((product) => product.id === id);
      if (!one) {
        throw new Error("Product not found");
      } else {
        let filtered = all.filter((product) => product.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(`El producto con ID "${id}" fue encontrado y eliminado satisfactoriamente`);
        return one;
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((product) => product.id === id);
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
      console.error("Error al actualizar el producto:", error.message);
      throw error;
    }
  }

}
async function pruebaAsync() {
  const gestorDeProductos = new ProductManager();

  await gestorDeProductos.create({
    title: "Chupete",
    category: "Accesorios",
    price: 1500,
    stock: 1000,
  });

  await gestorDeProductos.create({
    title: "Conjunto enterizo unisex",
    category: "Indumentaria",
    price: 900,
    stock: 800,
  });

  await gestorDeProductos.create({
    title: "Porta-chupetes",
    category: "Accesorios",
    price: 750,
    stock: 15,
  });

  await gestorDeProductos.create({
    title: "Practicuna",
    category: "Muebles",
    price: 2500,
    stock: 600,
  });

  await gestorDeProductos.create({
    title: "Pañalera Verona",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set corta uñas",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set toalla y cambiador despues del baño",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Zapatos tejidos Sandia",
    category: "Calzado",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Cardigan tejido a mano",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Pijama disfraz de monstruo 6M",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Peluche de cebra con sonido",
    category: "Jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set de herramientas para taller",
    category: "Jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Bicicleta con rueditas de apoyo",
    category: "Deportes",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Casa de muñecas",
    category: "Jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Patines princesas Disney de 4 ruedas",
    category: "Deportes",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Zapatillas con luces HotWheels",
    category: "Calzado",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set de vinchas con brillos",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Camisa manga larga para nene",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Pantalon de vestir nene colores surtidos",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Cinturon de princesas",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Buzo talle 2 Frozen",
  });

  await gestorDeProductos.create({
    title: "Muñeco 'Buzz Lightyear' con sonido",
  });

  await gestorDeProductos.create({
    title: "Remera talle 4 F1 Ferrari",
  });

  await gestorDeProductos.create({
    title: "Conjunto talle 3 AFA",
  });

  await gestorDeProductos.create({
    title: "Vestido con lazos de fiesta talle 2",
  });

  await gestorDeProductos.create({
    title: "Sandalias rosas para nena",
  });

  await gestorDeProductos.create({
    title: "Coche Carestino reclinable a 3 niveles",
  });

  await gestorDeProductos.create({
    title: "Asiento elevador Carestino para niños",
  });

  await gestorDeProductos.create({
    title: "Butaca de viaje Carestino con giro 360°",
  });

  await gestorDeProductos.create({
    title: "Sillita mecedora Carestino para siestas",
  });

  await gestorDeProductos.create({
    title: "Sacaleche electrico con mamadera",
  });

  await gestorDeProductos.create({
    title: "Mamadera Avent 12onz",
  });

  await gestorDeProductos.create({
    title: "Bañera plegable con soporte para Recien nacidos",
  });

  await gestorDeProductos.create({
    title: "Silla de comedor con juguete unisex",
  });

  await gestorDeProductos.create({
    title: "Combo mosquitero + protector de lluvia para cochecitos",
  });

  await gestorDeProductos.create({
    title: "Cochecito SMARTDUO Carestino",
  });

  await gestorDeProductos.create({
    title: "Mochila portabebes",
  });

  await gestorDeProductos.create({
    title: "Gimnasio didactico multifuncion",
  });

  await gestorDeProductos.create({
    title: "Mecedor de caballito de madera",
  });

  await gestorDeProductos.create({
    title: "Muñeco 'Woody' Toy Story con sonido",
  });

  console.log(await gestorDeProductos.read());
  //await gestorDeProductos.readOne(); - Esta linea nos genera un error al no tener parametro definido.
  //await gestorDeProductos.readOne("0ac63f253213dddb6869b6a4");
  //await gestorDeProductos.destroy("0ac63f253213dddb6869b6a4");
  //await gestorDeProductos.destroy("80047a"); - Esta linea nos genera un error al no existir este producto en el JSON
}

//pruebaAsync();

const productManager = new ProductManager();
export default productManager;
