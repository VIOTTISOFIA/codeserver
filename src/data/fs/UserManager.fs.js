import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./src/data/fs/file/user.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado!");
    } else {
      console.log("archivo ya existe!");
    }
  }

  async create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error("Usuario no creado.Ingrese todos los datos.");
      } else {
        // const user = {
        //   id: crypto.randomBytes(12).toString("hex"),
        //   photo:
        //     data.photo ||
        //     "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg",
        //   email: data.email,
        //   age: data.age,
        //   password: data.password,
        //   role: data.role,
        // };
        // creo el objeto con los datos de la nota
        let users = await fs.promises.readFile(this.path, "utf-8");
        // espero la lectura del archivo y lo guardo en la variable users
        users = JSON.parse(users);
        // parseo
        users.push(data);
        // pusheo
        console.log("usuario creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async read(role) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      // espero la lectura del archivo y lo guardo en la variable users
      all = JSON.parse(all);
      // parseo
      role && (all = all.filter((each) => each.role === role));
      return all;
    } catch (error) {
      console.log("error al obtener los datos");
      throw error;
    }
  }
  // class PaginationService {
  // constructor(model) {
  //   this.Model = model;
  // }

  //   async paginate({ filter = {}, opts = {} } = {}) {
  //     try {
  //       const options = {
  //         ...opts,
  //         page: opts.page || 1, // Página predeterminada: 1
  //         limit: opts.limit || 10, // Límite predeterminado: 10
  //       };

  //       const result = await this.Model.paginate(filter, options);
  //       console.log(result);
  //       return result;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // }
  // export default PaginationService;
  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let one = users.find((each) => each.id === id);
      return one;
    } catch (error) {
      console.log("error al leer el usuario:", error.message);
      return error;
    }
  }

  async readByEmail(email) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let one = users.find((each) => each.email === email);
      return one;
    } catch (error) {
      console.log("Error al leer el usuario por email:", error.message);
      return error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw Error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      const one = all.find((user) => user.id === id);
      if (!one) {
        throw new Error("User not found");
      } else {
        let filtered = all.filter((user) => user.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(
          `El user con ID "${id}" fue encontrado y eliminado satisfactoriamente`
        );
        return one;
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}

const User = new UserManager();

async function test() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    email: "sofi_04_04@hotmail.com",
    age: 33,
    password: "hola1234",
    role: "adm",
  });
  await gestorDeUsuarios.create({
    email: "roxana@hotmail.com",
    age: 24,
    password: "hola5678",
    role: "user",
  });
  await gestorDeUsuarios.create({
    email: "celine@hotmail.com",
    age: 18,
    password: "hola91011",
    role: "user",
  });
  await gestorDeUsuarios.create({
    email: "martin@hotmail.com",
    age: 33,
    password: "hola1213",
    role: "user",
  });
  console.log(await gestorDeUsuarios.read());
  console.log(await gestorDeUsuarios.readOne("950ffdebf54f79300a3c7328"));
}
// test();
const userManager = new UserManager();
export default userManager;
