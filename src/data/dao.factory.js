import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;
let dao = {};
//objeto que voy a cargar dinamicamente con las importaciones de los managers que correspondan

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    //voy a llenar dao con las importaciones de memory
    const { default: productsManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );
    const { default: cartsMem } = await import("./memory/Carts.memory.js");
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    //se tienen que traer TODOS los manager de todos los recursos y ya tienen que estar HOMOLOGADOS
    //una vez que logré importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = {
      users: usersManagerMem,
      products: productsManagerMem,
      carts: cartsMem,
    };
    break;
  case "fs":
    console.log("connected to file system");
    //voy a llenar dao con las importaciones de fs
    const { default: productsManagerFs } = await import(
      "./fs/ProductManager.fs.js"
    );
    const { default: cartsFs } = await import("./fs/Carts.fs.js");
    const { default: usersManagerFs } = await import("./fs/UserManager.fs.js");
    //se tienen que traer TODOS los manager de todos los recursos y ya tienen que estar HOMOLOGADOS
    //una vez que logré importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = {
      users: usersManagerFs,
      products: productsManagerFs,
      carts: cartsFs,
    };
    break;
  default:
    console.log("connected to database");
    dbConnect();
    //por defecto manejemos mongo
    // voy a llenar dao con las importaciones de mongo
    const { default: productsManagerMongo } = await import(
      "./mongo/managers/ProductsManager.mongo.js"
    );
    const { default: cartsMongo } = await import(
      "./mongo/managers/CartsManager.mongo.js"
    );
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/UserManager.mongo.js"
    );
    //se tienen que traer TODOS los manager de todos los recursos y ya tienen que estar HOMOLOGADOS
    //una vez que logré importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = {
      users: usersManagerMongo,
      products: productsManagerMongo,
      carts: cartsMongo,
    };
    break;
}

export default dao;
