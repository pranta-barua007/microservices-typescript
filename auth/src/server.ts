import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Jwt must be defined')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
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