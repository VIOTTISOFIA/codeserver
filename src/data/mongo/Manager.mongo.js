import mongoose from "mongoose";
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
      const all = await this.Model.find(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async paginate({ filter, opts }) {
    try {
      const all = await this.Model.paginate(filter, opts);
      console.log(filter);
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const options = {
        ...opts,
        page: opts.page || 1, // Página predeterminada: 1
        limit: opts.limit || 10, // Límite predeterminado: 10
      };

      const result = await this.Model.paginate(filter, options);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const one = await this.Model.findById(filter).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }

  //nuevo metodo 'ReadByEmail' utilizado en sessions
  async readByEmail(email) {
    try {
      const one = await this.Model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  //nuevo metodo 'readCart' para usar en el endpoint que trae todos los carritos de un usuario
  async readCart(filter) {
    try {
      const results = await this.Model.find(filter).lean();
      return results;
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

  async destroy(filter) {
    try {
      const one = await this.Model.findByIdAndDelete(filter);
      return one;
    } catch (error) {
      throw error;
    }
  }

  //nuevo metodo 'destroyAll' para usar en el endpoint que elimina todos los carritos de un usuario
  async destroyAll(userId) {
    try {
      console.log("userId recibido en destroyAll:", userId);
      const result = await this.Model.deleteMany({ user_id: userId });
      console.log("Resultado de la eliminación:", result);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async aggregate(obj) {
    try {
      const result = await this.Model.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

mongoose.plugin(mongoosePaginate);

export default Manager;
