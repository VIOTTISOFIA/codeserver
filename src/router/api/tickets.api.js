import { Router } from "express";
import { Types } from "mongoose";

import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const ticketsRouter = Router();

ticketsRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    // console.log(`Received request for user ID: ${uid}`);
    const tickets = await cartsManager.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(uid),
        },
      },
      {
        $lookup: {
          foreignField: "_id",
          from: "products",
          localField: "product_id",
          as: "product_id",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$ROOT"],
          },
        },
      },
      { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
      // { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
    ]);
    // console.log(`Found tickets: ${JSON.stringify(tickets)}`);
    return res.json({
      statusCode: 200,
      response: tickets,
    });
  } catch (error) {
    // console.error(`Error processing request: ${error.message}`);
    return next(error);
  }
});

export default ticketsRouter;
