class Service {
  constructor(manager) {
    this.manager = manager;
  }
  async createService(data) {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readService(role) {
    try {
      const all = await this.manager.read(role);
    } catch (error) {
      throw error;
    }
  }
  async readOneService(email) {
    try {
      const one = await this.manager.readOne(email);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async updateService(uid, data) {
    try {
      const one = await this.manager.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroyService(uid) {
    try {
      const one = await this.manager.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  }
}
export default Service;
