class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
<<<<<<< HEAD
  async read(role) {
    // role para filtrar por roles
=======

  async read(category) {
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
    try {
      const all = await this.Model.find();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      //   const one = await User.findById(id);
      const one = await this.Model.findOne({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      throw error;
    }
  }
<<<<<<< HEAD
  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
=======

  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
      return one;
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
    } catch (error) {
      throw error;
    }
  }
}
<<<<<<< HEAD
=======

>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
export default Manager;
