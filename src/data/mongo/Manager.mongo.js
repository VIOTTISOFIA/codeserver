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
  async read(filter) {
    // filter para filtrar con el objeto que corresponda
    try {
      const all = await this.Model.find(filter).lean()
      return all;
    } catch (error) {
      throw error;
    }
  }

  async paginate({ filter, opts }) {
    // filter para filtrar con el objeto que corresponda
    try {
      const all = await this.Model.paginate(filter, opts)
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      //   const one = await User.findById(id);
      const one = await this.Model.findOne({ _id: id }).lean();
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
