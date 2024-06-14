import mongoose, { connection } from "mongoose";

export const connectDB = async () => {
  try {
    console.log(`${process.env.MONGO_URI}`);

    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`!, {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    });
    connection.on("Connected", () => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
};
