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
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          foto: data.photo || "https://www.pngplay.com/image/325510",
          email: data.email,
          password: data.password,
          role: data.role,
        };
<<<<<<< HEAD
        // creo el objeto con los datos de la nota
=======
        // creo el objeto con los datos del usuario
>>>>>>> dev
        let users = await fs.promises.readFile(this.path, "utf-8");
        // espero la lectura del archivo y lo guardo en la variable users
        users = JSON.parse(users);
        // parseo
        users.push(user);
        // pusheo
        console.log("usuario creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
<<<<<<< HEAD
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
=======

  async read(role) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      // espero la lectura del archivo y lo guardo en la variable users
      users = JSON.parse(users);
      // parseo
      role && (users = users.filter((each) => each.role === role));
      return users;
    } catch (error) {
      console.log(error);
>>>>>>> dev
      throw error;
    }
  }
  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let one = users.find((each) => each.id === id);
<<<<<<< HEAD
      return one;
    } catch (error) {
      console.log("error al leer el usuario:", error.message);
=======
      if (!one) {
        throw new Error("El usuario que buscas no existe.");
      }
      return one
    } catch (error) {
      console.log(error);
>>>>>>> dev
      return error;
    }
  }

  async update(id, data) {
    try {
<<<<<<< HEAD
      let all = await this.read();
      let one = all.find((each) => each.id === id);
=======
      let users = await this.read();
      let one = users.find((each) => each.id === id);
>>>>>>> dev
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
    password: "hola1234",
    role: "adm",
  });
  await gestorDeUsuarios.create({
    email: "roxana@hotmail.com",
    password: "hola5678",
    role: "user",
  });
  await gestorDeUsuarios.create({
    email: "celine@hotmail.com",
    password: "hola91011",
    role: "user",
  });
  await gestorDeUsuarios.create({
    email: "martin@hotmail.com",
    password: "hola1213",
    role: "user",
  });
  console.log(await gestorDeUsuarios.read());
  console.log(await gestorDeUsuarios.readOne("950ffdebf54f79300a3c7328"));
}
//test();
const userManager = new UserManager();
export default userManager;
