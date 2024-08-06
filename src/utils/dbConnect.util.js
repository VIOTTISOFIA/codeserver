import { connect } from "mongoose";

async function dbConnect() {
  try {
    await connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;

// import { connect } from "mongoose";

// async function dbConnect() {
//   try {
//     await connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }
// }

// export default dbConnect;
