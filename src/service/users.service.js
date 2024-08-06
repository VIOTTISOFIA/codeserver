import Service from "./service.js";
// import userManager from "../data/fs/UserManager.fs.js";
// import userManager from "../data/memory/UserManager.memory.js";
// import userManager from "../data/mongo/Manager.mongo.js";
// AHORA NINGUN SERVICIO LLAMA A LA PERSISTENCIA
// LOS SERVICIOS VAN A LLAMAR AL DAO
// SIEMPRE Y CUANDO NO SE IMPLEMENTE UNA CAPA EXTRA : REPOSITORY

// import dao from "../data/dao.factory.js";
// const { users } = dao;
// no se conecta con el patron dao por q incorporamos la capa de repository
import usersRepository from "../repositories/users.rep.js";
// SERVICO LLAMA A REPOSITORY
const usersService = new Service(usersRepository);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = usersService;
