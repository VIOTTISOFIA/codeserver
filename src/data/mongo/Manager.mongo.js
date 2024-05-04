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

  async read(category) {
    try {
      const all = await this.Model.find();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      //const one = await Product.findById(id)
      const one = await this.Model.findOne({ _id: id });
      //se coloca entre llaves porque es un obj y busco con _id por la estructura object_id de mongo
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
      //declaro en el param el obj new:true para que me devuelva el obj actualizado
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Manager;
