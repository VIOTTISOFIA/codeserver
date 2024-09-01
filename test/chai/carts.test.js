import { expect } from "chai"
import mongoose from "mongoose"
import environment from "../../src/utils/env.util.js"
import dao from "../../src/data/dao.factory.js"
const { carts } = dao

describe(
    "testeando el recurso CARTS",
    () => {
        const data = {
            //es necesario definir el ObjectId de mongo para la creacion de un carrito
            //ya que es obligatorio en el modelo de 'carts'
            user_id: new mongoose.Types.ObjectId(), 
            product_id: new mongoose.Types.ObjectId(),
            quantity: 2,
            state: "reserved",
          };
          let id;
          
        it (
            "Testeando que la creacion de un carrito devuelve un obj con un _id",
            async () => {
                const response = await carts.create(data)
                id = response._id
                expect(response).to.have.property("_id")
            }
        )
         it(
            "testeando la creacion de un carrito con el estado 'reserved' ",
            () => {
                expect(data).to.have.property("state")
            }
        )
        it (
            "Testeando la actualizacion del estado del carrito",
            async () => {
                const one = await carts.readOne({_id: id})
                const response = await carts.update(id, { state: "paid" } )
                expect(one.state).is.not.equal(response.state)
            }
        )
        it (
            "Testeando la eliminacion de un carrito",
            async () => {
                await carts.destroy(id)
                const one = await carts.readOne({_id: id})
                expect(one).not.exist
            }
        )
     
    })