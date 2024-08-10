import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;
let dao = {};
//obj que voy a cargar dinamicamente con las importaciones de los managers correspondientes

switch (persistence) {
  case "memory":
    console.log("Connected to memory");
    //voy a llenar dao con importaciones de memory
    const { default: productsManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    const { default: cartsManagerMem } = await import(
      "./memory/Carts.memory.js"
    );
    //una vez que tengo las importaciones de los managers, lleno el obj DAO con los recursos correspondientes
    dao = {
      users: usersManagerMem,
      products: productsManagerMem,
      carts: cartsManagerMem,
    };
    break;
  case "fs":
    console.log("Connected to File System");
    //voy a llenar dao con importaciones de FS
    const { default: productsManagerFs } = await import(
      "./fs/ProductManager.fs.js"
    );
    const { default: usersManagerFs } = await import(
      "./fs/UserManager.fs.js"
    );
    const { default: cartsManagerFs } = await import("./fs/Carts.fs.js");
    //una vez que tengo las importaciones de los managers, lleno el obj DAO con los recursos correspondientes
    dao = {
      users: usersManagerFs,
      products: productsManagerFs,
      carts: cartsManagerFs,
    };
    break;
  default:
    console.log("Connected to Mongo DB");
    dbConnect();
    //por defecto manejamos mongo
    //voy a llenar dao con importaciones de mongo
    const { default: productsManagerMongo } = await import(
      "./mongo/managers/ProductsManager.mongo.js"
    );
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/UserManager.mongo.js"
    );
    const { default: cartsManagerMongo } = await import(
      "./mongo/managers/CartsManager.mongo.js"
    );
    //una vez que tengo las importaciones de los managers, lleno el obj DAO con los recursos correspondientes
    dao = {
      users: usersManagerMongo,
      products: productsManagerMongo,
      carts: cartsManagerMongo,
    };
    break;
}

export default dao;
