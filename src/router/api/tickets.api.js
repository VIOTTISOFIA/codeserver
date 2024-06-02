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
