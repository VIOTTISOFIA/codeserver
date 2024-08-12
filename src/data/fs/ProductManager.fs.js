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
    photo: "https://i.postimg.cc/TwBLBkdz/chupete-1.jpg",
    category: "Accesorios",
    price: 1500,
    stock: 1000,
  });

  await gestorDeProductos.create({
    title: "Conjunto enterizo unisex",
    photo: "https://i.postimg.cc/NjbyQGG7/enterizo-2.jpg",
    category: "Indumentaria",
    price: 900,
    stock: 800,
  });

  await gestorDeProductos.create({
    title: "Porta-chupetes",
    photo: "https://i.postimg.cc/634TVdrY/portachupete-3.jpg",
    category: "Accesorios",
    price: 750,
    stock: 15,
  });

  await gestorDeProductos.create({
    title: "Practicuna",
    photo: "https://i.postimg.cc/J4YsSQjK/practicuna-4.jpg",
    category: "Muebles",
    price: 2500,
    stock: 600,
  });

  await gestorDeProductos.create({
    title: "Pañalera Verona",
    photo: "https://i.postimg.cc/pr29MG0c/pa-alera-5.jpg",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set corta uñas",
    photo: "https://i.postimg.cc/ZRLRHPT8/setcortaunias-6.jpg",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set toalla y cambiador despues del baño",
    photo: "https://i.postimg.cc/mkXrfb1h/set-toalla-7.jpg",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Zapatos tejidos Sandia",
    photo: "https://i.postimg.cc/PrJxb80D/tejidos-Sandia-8.jpg",
    category: "Calzado",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Cardigan tejido a mano",
    photo: "https://i.postimg.cc/DzJLxMDq/Cardigan-Tejido-9.jpg",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Pijama disfraz de monstruo 6M",
    photo: "https://i.postimg.cc/QxdB6zKH/pijama-Monstruo-10.jpg",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Peluche de cebra con sonido",
    photo: "https://i.postimg.cc/fLYXN0My/cebrapeluche-11.jpg",
    category: "Jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set de herramientas para taller",
    photo: "https://i.postimg.cc/CxdqK2wW/juegode-Herramientas-12.jpg",
    category: "Jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Bicicleta con rueditas de apoyo",
    photo: "https://i.postimg.cc/2yF44LtM/bici-Con-Rueditas-13.jpg",
    category: "Deportes",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Casa de muñecas",
    photo: "https://i.postimg.cc/GmSvJCML/casde-Muniecas-XL-14.jpg",
    category: "Jugueteria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Patines princesas Disney de 4 ruedas",
    photo: "https://i.postimg.cc/dVzLVtHy/patines-Disney-Princesas-15.jpg",
    category: "Deportes",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Zapatillas con luces 'Spiderman'",
    photo: "https://i.postimg.cc/pdfXVQ5w/zapatillascon-Luces-16.jpg",
    category: "Calzado",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Set de vinchas con brillos",
    photo: "https://i.postimg.cc/JhVzWY03/vinchas-17.jpg",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Camisa manga larga para nene",
    photo: "https://i.postimg.cc/28GQyvhB/camisa-Manga-Larga-18.jpg",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Pantalon estilo CARGO para bebes",
    photo: "https://i.postimg.cc/gcDXHpJC/pantalon-Cargobebe-19.jpg",
    category: "Indumentaria",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Cinturon 'Attitude' para nenas",
    photo: "https://i.postimg.cc/43Dtq1kj/cinto-Attitude-20.jpg",
    category: "Accesorios",
    price: 15000,
    stock: 250,
  });

  await gestorDeProductos.create({
    title: "Buzo talle 2 Frozen",
    photo: "https://i.postimg.cc/XNwcMtvL/buzo-Frozen-21.jpg",
    category: "Indumentaria",
  });

  await gestorDeProductos.create({
    title: "Muñeco 'Buzz Lightyear' con sonido",
    photo: "https://i.postimg.cc/PqwvW8py/juguete-Buzzlightyear-22.jpg",
    category: "Jugueteria",
  });

  await gestorDeProductos.create({
    title: "Traje F1 para bebes 'Ferrari'",
    photo: "https://i.postimg.cc/3J8GsRVr/conjuntito-F1-23.jpg",
    category: "Indumentaria",
  });

  await gestorDeProductos.create({
    title: "Conjunto talle 3 AFA",
    photo: "https://i.postimg.cc/3N7GJJwB/Conjunto-AFA-24.jpg",
    category: "Indumentaria",
  });

  await gestorDeProductos.create({
    title: "Vestido con lazos de fiesta talle 2",
    photo: "https://i.postimg.cc/t4V4wGqC/vestidode-Fiesta-25.jpg",
    category: "Indumentaria",
  });

  await gestorDeProductos.create({
    title: "Sandalias rosas para nena",
    photo: "https://i.postimg.cc/90Ffn4Mv/sandalias-Rosas-26.jpg",
    category: "Calzado",
  });

  await gestorDeProductos.create({
    title: "Coche Carestino reclinable a 3 niveles",
    photo: "https://i.postimg.cc/hvrdJWzq/cochecarestino-27.jpg",
    category: "Muebles",
  });

  await gestorDeProductos.create({
    title: "Asiento elevador Carestino para niños",
    photo: "https://i.postimg.cc/N0S7YcTJ/asiento-Elevador-28.jpg",
    category: "Muebles",
  });

  await gestorDeProductos.create({
    title: "Butaca de viaje Carestino con giro 360°",
    photo: "https://i.postimg.cc/zv1CbFxT/butaca-Carestino-29.jpg",
    category: "Muebles",
  });

  await gestorDeProductos.create({
    title: "Sillita mecedora Carestino",
    photo: "https://i.postimg.cc/MT0c42Yj/mecedora-Madera-30.jpg",
    category: "Muebles",
  });

  await gestorDeProductos.create({
    title: "Sacaleche electrico con mamadera",
    photo: "https://i.postimg.cc/nzxrqStV/sacaleches-Electrico-31.jpg",
    category: "Accesorios",
  });

  await gestorDeProductos.create({
    title: "Mamadera Avent 12onz",
    photo: "https://i.postimg.cc/0y3JKCQr/mamadera12onz-32.jpg",
    category: "Accesorios",
  });

  await gestorDeProductos.create({
    title: "Bañera plegable con soporte para recien nacidos",
    photo: "https://i.postimg.cc/50z52RSx/ba-era-Plegable-33.jpg",
    category: "Accesorios",
  });

  await gestorDeProductos.create({
    title: "Silla de comedor con juguete unisex",
    photo: "https://i.postimg.cc/MZdHjY3x/silla-Comedor-34.jpg",
    category: "Muebles",
  });

  await gestorDeProductos.create({
    title: "Protector de lluvia para cochecitos",
    photo: "https://i.postimg.cc/x1kXQbRQ/Protectorde-Cochecitos-35.jpg",
    category: "Accesorios",
  });

  await gestorDeProductos.create({
    title: "Cochecito SMARTDUO Carestino",
    photo: "https://i.postimg.cc/dtf05VKx/Smart-Duo-36.jpg",
    category: "Muebles",
  });

  await gestorDeProductos.create({
    title: "Mochila portabebes",
    photo: "https://i.postimg.cc/X74KnxGb/canguro-Portabebe-37.jpg",
    category: "Accesorios",
  });

  await gestorDeProductos.create({
    title: "Gimnasio didactico multifuncion",
    photo: "https://i.postimg.cc/BQmF43fT/Gimnasio-Didactino-38.jpg",
    category: "Jugueteria",
  });

  await gestorDeProductos.create({
    title: "Mecedor de caballito de madera",
    photo: "https://i.postimg.cc/QtZ90xc3/Mecedor-Peluche-39.jpg",
    category: "Jugueteria",
  });

  await gestorDeProductos.create({
    title: "Muñeco 'Woody' Toy Story con sonido",
    photo: "https://i.postimg.cc/D0BSvrHv/Munieco-Woody-40.jpg",
    category: "Jugueteria",
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
