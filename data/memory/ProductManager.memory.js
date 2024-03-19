class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock
    };
    ProductManager.#products.push(product);
    console.log("Producto creado");
  }

  read() {
    return ProductManager.#products;
  }
}

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
    title: "zapatilla",
  photo: "zapatilla.jpg",
  category: "calzado",
  price: 1500,
  stock: 1000,
});

gestorDeProductos.create({
    title: "remera",
  photo: "remera.jpg",
  category: "indumentaria",
  price: 900,
  stock: 800,
});

gestorDeProductos.create({
    title: "cinturon",
  photo: "cinturon.jpg",
  category: "accesorios",
  price: 750,
  stock: 15,
});

gestorDeProductos.create({
    title: "pantalon",
  photo: "pantalon.jpg",
  category: "indumentaria",
  price: 2500,
  stock: 600,
});

gestorDeProductos.create({
    title: "mochila",
  photo: "mochila.jpg",
  category: "accesorios",
  price: 15000,
  stock: 250,
});

console.log(gestorDeProductos.read());
