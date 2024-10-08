import dao from "../data/dao.factory.js";
import CartsDTO from "../dto/carts.dto.js";
const { carts } = dao;

class CartsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data, dto) => {
    try {
      data = new CartsDTO(data);
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readRepository = async (role) => {
    try {
      const all = await this.model.read(role);
      return all;
    } catch (error) {
      throw error;
    }
  };

  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.model.read({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };

  readCartRepository = async ({ user_id }) => {
    try {
      const cart = await this.model.readCart({ user_id });
      return cart;
    } catch (error) {
      throw error;
    }
  };

  updateRepository = async (uid, data) => {
    try {
      const one = await this.model.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroyRepository = async (uid) => {
    try {
      const one = await this.model.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroyAllRepository = async (userIdObject) => {
    try {
      const result = await this.model.destroyAll(userIdObject);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

const cartsRepository = new CartsRepository(carts);
export default cartsRepository;
