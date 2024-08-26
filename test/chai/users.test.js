import { expect } from "chai";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { usersManager } = dao;

describe("testeando en recurso user", () => {
  const data = { email: "sofi_04_04@hotmail.com", photo: "image.png" };
  let id;

  it("Testeando que la creacion de un user reciba un objeto con la propiedad email", () => {
    expect(data).to.have.property("email");
  });

  it("Testeando que la creacion de un user reciba un objeto con la propiedad email sea string", () => {
    expect(data.email).to.be.a("string");
  });

  // it("Testeando que la creacion de un user reciba un objeto con un _id", async () => {
  //   const response = await usersManager.create(data);
  //   email = response.email;
  //   expect(response).to.have.property("_id");
  // });
  // it(// la descripcion del test
  // "Testeando la eliminacion de un user", async () => {
  //   const response = await usersManager.destroy(email);
  //   await usersManager.destroy(email);
  //   const one = await usersManager.readByEmail({ email: email });
  //   console.log(one);
  //   expect(one).not.exist;
  // });
});
