import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

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

  async paginate({ filter = {}, opts = {} } = {}) {
    try {
      const options = {
        ...opts,
        page: opts.page || 1, // Página predeterminada: 1
        limit: opts.limit || 10 // Límite predeterminado: 10
      };

      const result = await this.Model.paginate(filter, options);
      console.log(result)
      return result;
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

mongoose.plugin(mongoosePaginate)

export default Manager;
