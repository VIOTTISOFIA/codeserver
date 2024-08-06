class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async createService(data) {
    try {
      const one = await this.repository.createRepository(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readService(role) {
    try {
      const all = await this.repository.readRepository(role);
      return all; // Asegúrate de devolver el resultado
    } catch (error) {
      throw error;
    }
  }

  async readOneService(email) {
    try {
      const one = await this.repository.readOneRepository(email);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async updateService(uid, data) {
    try {
      const one = await this.repository.updateRepository(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroyService(uid) {
    try {
      const one = await this.repository.destroyRepository(uid);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
