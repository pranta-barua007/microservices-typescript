import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Jwt must be defined')
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo uri must be defined')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once('open', () => {
      console.log('MongoDB connection is Ready!');
    });

    mongoose.connection.on('error', (err) => {
      console.error(err);
    });
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
}

start();