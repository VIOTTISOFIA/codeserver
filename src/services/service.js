class Service {
  constructor(repository) {
    this.repository = repository;
  }

  createService = async (data) => {
    try {
      const one = await this.repository.createRepository(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readService = async (id) => {
    try {
      const all = await this.repository.readRepository(id);
      return all;
    } catch (error) {
      throw error;
    }
  };

  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.repository.paginateRepository({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneService = async (id) => {
    try {
      const one = await this.repository.readOneRepository(id);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readByEmailService = async (email) => {
    try {
      const one = await this.repository.readOneRepository(email);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readCartService = async ({ user_id }) => {
    try {
      const cart = await this.repository.readCartRepository({ user_id });
      return cart;
    } catch (error) {
      throw error;
    }
  };

  updateService = async (uid, data) => {
    try {
      const one = await this.repository.updateRepository(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroyService = async (uid) => {
    try {
      const one = await this.repository.destroyRepository(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };

  destroyAllService = async (userIdObject) => {
    try {
      const result = await this.repository.destroyAllRepository(userIdObject);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default Service;
