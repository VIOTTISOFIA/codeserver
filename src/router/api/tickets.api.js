import { Types } from "mongoose";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import CustomRouter from "../customRouter.js";
import { Router } from "express";

class TicketsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], isAuth, async (req, res, next) => {
      try {
        const user_id = req.user._id; //Obtengo user_id desde el token verificado

        if (!user_id) {
          throw new Error("User ID not found in request");
        }
        console.log("user_id:", user_id);

        const tickets = await cartsManager.aggregate([
          {
            $match: {
              user_id: new Types.ObjectId(user_id),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "product_info",
            },
          },
          {
            $unwind: "$product_info",
          },
          {
            $set: {
              subTotal: { $multiply: ["$quantity", "$product_info.price"] },
            },
          },
          {
            $group: { _id: "$user_id", total: { $sum: "$subTotal" } },
          },
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              total: "$total",
              date: new Date(),
            },
          },
          {
            $merge: {
              into: "tickets",
            },
          },
        ]);

        return res.response200("Ticket created successfully", tickets);
      } catch (error) {
        return next(error);
      }
    });
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
