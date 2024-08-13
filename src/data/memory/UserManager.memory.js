import fs from "fs";
import crypto from "crypto";

class UsersManager {
  static #users = [];
  async create(data) {
    try {
      // const user = {
      //   id: crypto.randomBytes(12).toString("hex"),
      //   photo:
      //     data.photo || "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg",
      //   email: data.email,
      //   password: data.password,
      //   role: data.role,
      // };

      if (!data.email || !data.password) {
        throw new Error("Usuario no creado.Ingrese todos los datos.");
      } else {
        UsersManager.#users.push(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  read(role) {
    try {
      if (UsersManager.#users.length === 0) {
        throw new Error("Ingrese nuevamente los datos");
      } else {
        return UsersManager.#users.filter((user) => user.role === role);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // async paginate({ filter = {}, opts = {} } = {}) {
  //   try {
  //     const options = {
  //       page: opts.page || 1, // Página predeterminada: 1
  //       limit: opts.limit || 10, // Límite predeterminado: 10
  //     };

  //     const skip = (options.page - 1) * options.limit;

  //     const totalDocs = await this.Model.countDocuments(filter); // Total de documentos que coinciden con el filtro
  //     const docs = await this.Model.find(filter)
  //       .skip(skip)
  //       .limit(options.limit)
  //       .exec();

  //     const result = {
  //       docs, // Documentos de la página actual
  //       totalDocs, // Total de documentos
  //       limit: options.limit, // Límite de documentos por página
  //       page: options.page, // Página actual
  //       totalPages: Math.ceil(totalDocs / options.limit), // Total de páginas
  //       hasNextPage: options.page < Math.ceil(totalDocs / options.limit), // Si hay una página siguiente
  //       hasPrevPage: options.page > 1, // Si hay una página anterior
  //     };

  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  readOne(id) {
    try {
      const one = UsersManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe el usuario");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readByEmail(email) {
    try {
      const one = UsersManager.#users.find((each) => each.email === email);
      if (!one) {
        throw new Error("No existe el usuario");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }

  update(id, data) {
    try {
      let all = this.read();
      let one = all.find((each) => each.id === id);
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

  destroy(id) {
    try {
      this.readOne(id);
      const filtered = UsersManager.#users.filter((each) => each.id !== id);
      UserManager.#users = filtered;
      console.log("Usuario eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeUsuarios = new UsersManager();
gestorDeUsuarios.create({
  photo: "sofia.jpg",
  email: "sofi_04_04@hotmail.com",
  password: "hola1234",
  role: "adm",
});
gestorDeUsuarios.create({
  photo: "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg",
  email: "roxana@hotmail.com",
  password: "hola5678",
  role: "user",
});
gestorDeUsuarios.create({
  photo: "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg",
  email: "celine@hotmail.com",
  password: "hola91011",
  role: "user",
});
gestorDeUsuarios.create({
  photo: "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg",
  email: "martin@hotmail.com",
  password: "hola1213",
  role: "user",
});

console.log(gestorDeUsuarios.read());
export default UsersManager;
