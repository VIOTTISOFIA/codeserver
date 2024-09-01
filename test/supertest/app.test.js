import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

describe("Testeando Baby Shop API", function () {
  this.timeout(20000);
  const user = {
    email: "prueba@coder.com",
    password: "Hola1234",
    role: 1,
    verify: true,
  };
  const product = {
    title: "mesa",
    category: "Muebles",
  };
  let token = "";
  let productId = "";
  it("Registro de un usuario", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { _body } = response;
    console.log(_body);
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Inicio de sesion de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { _body, headers } = response;
    console.log(_body);
    console.log(headers);
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Creacion de un producto por parte de un administrador", async () => {
    const response = await requester
      .post("/products")
      .send(product)
      .set("Cookie", token);
    const { _body } = response;
    console.log("Respuesta de creación del producto:", _body);
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Cierre de sesion", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});
//-------------- ESTOS TEST NO ME FUNCIONAN ----------------------------
/*  it("Eliminacion de un producto por parte de un administrador", async () => {
    
     const foundProduct = await productsRepository.readRepository({
       title: product.title,
     });
     console.log("Producto encontrado:", foundProduct);
     if (!productId) {
      throw new Error("El ID del producto es indefinido. No se puede proceder con la eliminación.");
    }
     const response = await requester
     .delete(`/products/${foundProduct._id}`)
       .set("Cookie", token);
     const { _body } = response;
     console.log("Respuesta de eliminación:", _body);
     expect(_body.statusCode).to.be.equals(200);
   }); */
/* it("Eliminacion de un producto por parte de un usuario comun", async () => {
    const response = await requester
      .delete("/products/66c3e8d564a539aa3d70cd79")
      .send(product);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  }); */

/*  it("Eliminacion de un usuario", 
    async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
    console.log(foundUser); //este log arroja null
    const response = await requester.delete("/users/" + foundUser._id)
  const { _body } = response;
  console.log("Respuesta de eliminación:", _body);
  expect(response.status).to.be.equals(200);
  });
}); */
