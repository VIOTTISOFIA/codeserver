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
        // creo el objeto con los datos de la nota
        let users = await fs.promises.readFile(this.path, "utf-8");
        // espero la lectura del archivo y lo guardo en la variable all
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
  async read(role) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      // espero la lectura del archivo y lo guardo en la variable users
      all = JSON.parse(all);
      // parseo
      role && (all = all.filter((each) => each.role === role));
      // if (users.length === 0) {
      //  si no hay notas
      // throw new Error("no hay usuarios");
      return all;
      // } else {
    } catch (error) {
      console.log("error al obtener los datos");
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let found = all.find((user) => user.id === id);
      // if (!one) {
      //   throw new Error("No existe el usuario");
      // } else {
      return found;
      // }
    } catch (error) {
      console.log("error al leer el usuario:", error.message);
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
    photo: "sofia.jpg",
    email: "sofi_04_04@hotmail.com",
    password: "hola1234",
    role: "adm",
  });
  await gestorDeUsuarios.create({
    photo: "roxana.jpg",
    email: "roxana@hotmail.com",
    password: "hola5678",
    role: "user",
  });
  await gestorDeUsuarios.create({
    photo: "celine.jpg",
    email: "celine@hotmail.com",
    password: "hola91011",
    role: "user",
  });
  await gestorDeUsuarios.create({
    photo: "martin.jpg",
    email: "martin@hotmail.com",
    password: "hola1213",
    role: "user",
  });
  console.log(await gestorDeUsuarios.read());
  console.log(await gestorDeUsuarios.readOne("950ffdebf54f79300a3c7328"));
}
// test();
const userManager = new UserManager();
export default userManager;

