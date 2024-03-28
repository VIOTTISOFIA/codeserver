import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./data/fs/file/user.json";
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
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        foto: data.foto || "https://www.pngplay.com/image/325510",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password || !data.role) {
        throw new Error("Usuario no creado.Ingrese todos los datos.");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("usuario creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      return (users = JSON.parse(users));
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let one = users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe el usuario");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);

      let filtered = users.filter((each) => each.id !== id);
      filtered = JSON.stringify(filtered, null, 2);

      await fs.promises.writeFile(filtered);
      console.log("Usuario eleminado");
    } catch (error) {
      console.log(error);
    }
  }
}

const User = new UserManager();

async function test() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    foto: "sofia.jpg",
    email: "sofi_04_04@hotmail.com",
    password: "hola1234",
    role: "adm",
  });
  await gestorDeUsuarios.create({
    foto: "roxana.jpg",
    email: "roxana@hotmail.com",
    password: "hola5678",
    role: "user",
  });
  await gestorDeUsuarios.create({
    foto: "celine.jpg",
    email: "celine@hotmail.com",
    password: "hola91011",
    role: "user",
  });
  await gestorDeUsuarios.create({
    foto: "martin.jpg",
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
