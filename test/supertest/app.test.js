import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

describe("Testeando Baby-Shop", function () {
  this.timeout(20000);
  const user = {
    email: "prueba5@hotmail.com",
    password: "HolaMundo1234",
    role: 1,
    verify: true,
  };

  const product = {
    title: "mesa",
    category: "Muebles",
  };

  let token = "";
  let productId = "";

  it("Registro de Usuarios", async () => {
    const response = await requester.post("/sessions/register").send(user);
    console.log("Registration Response:", response.body);
    expect(response.status).to.be.equals(201);
  });

  it("Inicio de sesion de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { headers, body } = response;
    console.log("Login Response:", body);
    console.log("Headers:", headers);
    token = headers["set-cookie"]
      ? headers["set-cookie"][0].split(";")[0]
      : null;
    expect(response.status).to.be.equals(200);
  });

  it("Creacion de un producto por parte de un administrador", async () => {
    const response = await requester
      .post("/products")
      .send(product)
      .set("Cookie", token);
    const { _body } = response;
    productId = _body.data._id; // Asignar el ID del producto
    console.log("Respuesta de creación del producto:", _body);
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Eliminacion de un producto por parte de un administrador", async () => {
    if (!productId) {
      throw new Error(
        "El ID del producto es indefinido. No se puede proceder con la eliminación."
      );
    }
    const response = await requester
      .delete(`/products/${productId}`)
      .set("Cookie", token);
    const { _body } = response;
    console.log("Respuesta de eliminación:", _body);
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminacion de un usuario", async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
    console.log("Resultado de la búsqueda del usuario:", foundUser);

    if (!foundUser) {
      throw new Error(`Usuario con email ${user.email} no encontrado`);
    }
    console.log("Found User:", foundUser);

    const response = await requester
      .delete(`/users/${foundUser._id}`)
      .set("Cookie", token);
    console.log("Respuesta de eliminación:", response.body);
    expect(response.status).to.be.equals(200);
  });

  it("Cierre de sesion", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});
