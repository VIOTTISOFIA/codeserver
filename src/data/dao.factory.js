import argsUtil from "../utils/args.util";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;
let dao = {};
// objeto que voy a cargar dinamicamente con las importaciones de los managers que correspondan

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    // voy a llenar dao con las importaciones de memory
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    //  const { default: productManager } = await import(
    //    "./memory/ProductManager.memory.js"
    //  );
    // se tienen que traer TODOS los managers de todos los recursos y ya tienen que esta homologados (identicos MediaStreamAudioDestinationNode, return, nombre y parametro. 10 metodos todos si asi fueran , 10 recursos en memory y en mongo )
    //    una vez que logre importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = { users: usersManagerMem };
    break;
  case "fs":
    console.log("connected to file system");
    // voy a llenar dao con las importaciones de fs
    const { default: usersManagerFs } = await import(
      "./fs/manager/UserManager.fs.js"
    );
    //  const { default: productManager } = await import(
    //    "./fs/ProductManager.fs.js"
    //  );
    // se tienen que traer TODOS los managers de todos los recursos y ya tienen que esta homologados (identicos MediaStreamAudioDestinationNode, return, nombre y parametro. 10 metodos todos si asi fueran , 10 recursos en memory y en mongo )
    //    una vez que logre importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = { users: usersManagerFs };
    break;
  default:
    console.log("connected to database");
    dbConnect();
    // por defecto manejamos mongo
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/UserManager.mongo.js"
    );
    //  const { default: productManager } = await import(
    //    "./fs/ProductManager.memory.js"
    //  );
    // se tienen que traer TODOS los managers de todos los recursos y ya tienen que esta homologados (identicos MediaStreamAudioDestinationNode, return, nombre y parametro. 10 metodos todos si asi fueran , 10 recursos en memory y en mongo )
    //    una vez que logre importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = { users: usersManagerMongo };
    break;
}
export default dao;
