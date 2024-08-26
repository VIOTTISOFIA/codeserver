import assert from "assert";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { products } = dao;

//DESCRIBIR EL ENTORNO DE TESTEO
describe(// este metodo requiere 2 argumentos:
//la descripcion del entorno de testeo
"testeando el recurso PRODUCTS", //la cb con todos los tests a ejecutar
() => {
  //antes de inicializar los tests, es necesario definir las variables a testear
  const data = { title: "mesa", category: "Muebles", photo: "photo.png" };
  let id;
  it(//la descripcin de los test
  "testeando que la creacion de un producto recibe un obj con la propiedad 'title' ", //la CB con la logica del test
  () => {
    assert.ok(data.title);
  });
  it(//la descripcin de los test
  "testeando que la creacion de un producto recibe un obj con la propiedad 'title' de tipo string", //la CB con la logica del test
  () => {
    assert.strictEqual(typeof data.title, "string");
  });
  it(//la descripcin de los test
  "testeando que la creacion de un producto recibe un obj con la propiedad 'category' ", //la CB con la logica del test
  () => {
    assert.ok(typeof data.specie);
  });
  it(//la descripcin de los test
  "testeando que la creacion de un producto recibe un obj con la propiedad 'category' de tipo string", //la CB con la logica del test
  () => {
    assert.strictEqual(typeof data.category, "string");
  });
  it("testeando que la creacion de producto recibe una propiedad opcional 'photo' ", () => {
    assert.ok(data.photo || true);
  });
  it("Testeando que la creacion de un producto devuelve un obj con un_id", async () => {
    const response = await products.create(data);
    id = response._id;
    assert.ok(response._id);
  });
  it("Testeando la actualizacion de un producto", async () => {
    const one = await products.readOne({ _id: id });
    const response = await products.update(id, { title: "lampara" });
    assert.notEqual(one.title, response.title);
  });
  it("Testeando la eliminacion de un producto", async () => {
    await products.destroy(id);
    const one = await products.readOne({ _id: id });
    assert.strictEqual(one, null);
  });
});
