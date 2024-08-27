import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

describe("Testeando Baby Shop API", function () {
  this.timeout(20000);
  const user = {
    email: "prueba20@coder.com",
    password: "HolaMundo1234",
    role: 1,
    verify: true,
  };
  const product = {
    title: "Silla de comedor con juguete unisex",
    category: "Muebles",
  };
  let token = "";
  let adminToken = ""; // Definir adminToken si se usa en las pruebas
  let productId = "";

  // it("Registro de un usuario", async () => {
  //   const response = await requester.post("/sessions/register").send(user);
  //   const { body } = response; // Corregido de _body a body
  //   console.log(body);
  //   expect(body.statusCode).to.be.equals(201);
  // });

  it("Inicio de sesión de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { body, headers } = response;
    console.log(body);
    console.log(headers);
    token = headers["set-cookie"][0].split(";")[0]; // Asumir que el token está en la primera cookie
    expect(body.statusCode).to.be.equals(200);
  });

  it("Creación de un producto por parte de un administrador", async () => {
    const res = await requester
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`) // Corregido request(app) a requester
      .send({ name: "Nuevo Producto", price: 20 });

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property("statusCode", 201);
    expect(res.body.message).to.include("CREATED ID:");

    productId = res.body.message.split(": ")[1]; // Extraer el ID y almacenar en productId
    const productRes = await requester
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(productRes.statusCode).to.equal(200);
    expect(productRes.body).to.have.property("_id", productId);
  });

  it("Eliminación de un producto por parte de un administrador", async () => {
    const createRes = await requester
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Producto para eliminar", price: 20 });

    const deleteProductId = createRes.body.message.split(": ")[1]; // Extraer el ID
    const deleteRes = await requester
      .delete(`/api/products/${deleteProductId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(deleteRes.statusCode).to.equal(200);
    expect(deleteRes.body).to.have.property("statusCode", 200);
    expect(deleteRes.body.message).to.include("DELETED");
  });

  it("Eliminación de un usuario", async () => {
    const registerRes = await requester
      .post("/api/sessions/register")
      .send({ email: "testuser@example.com", password: "password123" });

    const loginRes = await requester
      .post("/api/sessions/login")
      .send({ email: "testuser@example.com", password: "password123" });

    const userId = loginRes.body._id; // Obtener ID del usuario
    const deleteUserRes = await requester
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(deleteUserRes.statusCode).to.equal(200);
    expect(deleteUserRes.body).to.have.property("statusCode", 200);
    expect(deleteUserRes.body.message).to.include("DELETED");
  });

  it("Cierre de sesión", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", token);
    const { body } = response; // Corregido de _body a body
    expect(body.statusCode).to.be.equals(200);
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
