import { expect } from "chai";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { products } = dao;

describe("testeando el recurso PRODUCTS", () => {
  const data = { title: "mesa", category: "Muebles" };
  let id;
  it("testeando que la creacion de un producto recibe un obj con la propiedad 'title' ", () => {
    expect(data).to.have.property("title");
  });
  it("testeando que la creacion de un producto recibe un obj con la propiedad 'title' de tipo string", () => {
    expect(data.title).to.be.a("string");
  });
  it("testeando que la creacion de un producto recibe un obj con la propiedad 'category' ", () => {
    expect(data).to.have.property("category");
  });
  it("testeando que la creacion de un producto recibe un obj con la propiedad 'category' de tipo 'string' ", () => {
    expect(data.category).to.be.a("string");
  });
  it("testeando que la creacion de producto recibe una propiedad opcional 'photo' ", () => {
    expect(data).to.not.have.property("photo");
  });
  it("Testeando que la creacion de un producto devuelve un obj con un_id", async () => {
    const response = await products.create(data);
    id = response._id;
    expect(response).to.have.property("_id");
  });
  it("Testeando la actualizacion de un producto", async () => {
    const one = await products.readOne({ _id: id });
    const response = await products.update(id, { title: "lampara" });
    expect(one.title).is.not.equal(response.title);
  });
  it("Testeando la eliminacion de un producto", async () => {
    await products.destroy(id);
    const one = await products.readOne({ _id: id });
    expect(one).not.exist;
  });
});
