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

  //VERIFICAR CON POSTMAN ESTE METODO Y CORREGIR PROPIEDAD ID QUE ARROJA 'UNDEFINED'
  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        foto: data.foto || "https://i.postimg.cc/wTgNFWhR/profile.png",
        email: data.email,
        password: data.password,
        role: data.role || "0",
      };

      if (!data.email || !data.password) {
        throw new Error("Usuario no creado.Ingrese todos los datos.");
      } else {
        // creo el objeto con los datos del usuario
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
    }
  }
  async read(rol) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      // espero la lectura del archivo y lo guardo en la variable users
      users = JSON.parse(users);
      // parseo
      rol && (users = users.filter((each) => each.role === rol));
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let one = users.find((each) => each.id === id);
      return one;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id, data) {
    try {
      let users = await this.read();
      let one = users.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
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

  //CORREGIR FUNCION DESTROY EN FUNCIONALIDAD Y AGREGAR CONSOLE.LOG CON EL OBJETO COMO RESPUESTA DEL USUARIO ELIMINADO
  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let filtered = users.filter((each) => each.id !== id);
      if (users) {
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(filtered);
        return users;
      } else {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.log(error);
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

//CORREGIR RUTAS MARCADAS PARA MEJOR FUNCIONAMIENTO DEL MANAGER
