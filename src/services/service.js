//import userManager from "../data/mongo/managers/UserManager.mongo.js";

class Service {
  constructor(manager) {
    this.manager = manager;
  }

  createService = async (data) => {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

 readService = async (role) => {
    try {
      const all = await this.manager.read(role);
      return all;
    } catch (error) {
      throw error;
    }
  }

  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.manager.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  }

  readOneService = async (email) => {
    try {
      const one = await this.manager.readOne(email);
      return one;
    } catch (error) {
      throw error;
    }
  }

  readCartService = async ({ user_id }) => {
    try {
      const cart = await this.manager.readCart({ user_id });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  updateService = async (uid, data) => {
    try {
      const one = await this.manager.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  destroyService = async (uid) => {
    try {
      const one = await this.manager.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  }

  destroyAllService = async (userIdObject) => {
    try {
      const result = await this.manager.destroyAll(userIdObject);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
