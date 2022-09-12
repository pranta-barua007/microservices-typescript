import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listner";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listenr";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Jwt must be defined')
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo uri must be defined')
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined')
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined')
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined')
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID, 
      process.env.NATS_CLIENT_ID, 
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    })
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('open', () => {
      console.log('MongoDB connection is Ready!');
    });

    mongoose.connection.on('error', (err) => {
      console.error(err);
    });
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!");
  });
}

start();