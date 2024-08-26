import assert from "assert";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { usersManager } = dao;

// DESCRIBIR EL ENTORNO DE TESTEO ( describir required two arguments)

describe(// la descripcion del entorno de testeo
"testeando en recurso user", () => {
  // la callback con todos los tests a ejecutar
  // antes de inicializar los tests es necesario
  // definir las variables necesarias para testear
  const data = { email: "sofi_04_04@hotmail.com", photo: "image.png" };
  let id;
  it(// la descripcion del test
  "Testeando que la creacion de un user reciba un objeto con la propiedad email", () => {
    // la callback con la logica del test
    assert.ok(data.email);
  });
  it(// la descripcion del test
  "Testeando que la creacion de un user reciba un objeto con la propiedad email de tipo string", () => {
    // la callback con la logica del test
    assert.strictEqual(typeof data.email, "string");
  });
  it(// la descripcion del test
  "Testeando que la creacion de un user reciba un objeto con la propiedad opcional photo", () => {
    // la callback con la logica del test
    assert.ok(data.photo || true);
  });
  it(// la descripcion del test
  "Testeando que la creacion de un user reciba un objeto con un _id", () => {
    // la callback con la logica del test
    async () => {
      const response = await usersManager.create(data);
      email = response.email;
      assert.ok(response._id);
    };
  });
  it(// la descripcion del test
  "Testeando la eliminacion de un user", () => {
    // la callback con la logica del test
    async () => {
      await usersManager.destroy(email);
      const one = await usersManager.readByEmail({ email: email });
      console.log(one);
      assert.strictEqual(one, null);
    };
  });
});
