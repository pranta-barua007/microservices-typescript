import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "@prbtickets/common";
import { TicketCreatedListener } from "../ticket-created-listner";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const settup = async () => {
    //create an instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);
    //create a fake data event
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
    }
    //create a fake message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg }
}

it('creates and saves a ticket', async () => { 
    const { listener, data, msg } = await settup();
    // call the onMessage func with the data obj + message obj
    await listener.onMessage(data, msg);
    // write assertion to make sure ticket was created
    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
    const { listener, data, msg } = await settup();
    // call the onMessage func with the data obj + message obj
    await listener.onMessage(data, msg);
    // write assertion to make sure ack func is called
    expect(msg.ack).toHaveBeenCalled();
});