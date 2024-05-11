const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  static #users = [];
  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo || "https://www.pngplay.com/image/325510",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password) {
        throw new Error("Usuario no creado.Ingrese todos los datos.");
      } else {
        UserManager.#users.push(user);
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("Ingrese nuevamente los datos");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe el usuario");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      this.readOne(id);
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      UserManager.#users = filtered;
      console.log("Usuario eliminado");
    } catch (error) {
      console.log(error);
    }
  }

  update(id, data) {
    try {
      let one = UserManager.#users.find((each) => each.id !== id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return one;
      } else {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      throw Error;
    }
  }
}


const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
  foto: "sofia.jpg",
  email: "sofi_04_04@hotmail.com",
  password: "hola1234",
  role: "adm",
});
gestorDeUsuarios.create({
  photo: "roxana.jpg",
  email: "roxana@hotmail.com",
  password: "hola5678",
  role: "user",
});
gestorDeUsuarios.create({
  photo: "celine.jpg",
  email: "celine@hotmail.com",
  password: "hola91011",
  role: "user",
});
gestorDeUsuarios.create({
  photo: "martin.jpg",
  email: "martin@hotmail.com",
  password: "hola1213",
  role: "user",
});

console.log(gestorDeUsuarios.read());
