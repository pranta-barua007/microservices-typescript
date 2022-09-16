import { TicketUpdatedEvent } from "@prbtickets/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-updated-listenr"

const setup = async () => {
    //create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    //create and save a ticket 
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20
    });
    await ticket.save();
    //create a fake data obj
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'dhjfjkdhsj'
    }
    //create a fake msg obj
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }
    //return all of this stuff
    return { msg, data, ticket, listener };
};

it('finds, updates and save a ticket', async () => {
    const {msg, data, ticket, listener} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage func with the data obj + message obj
    await listener.onMessage(data, msg);
    // write assertion to make sure ack func is called
    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { listener, data, msg } = await setup();

    data.version = 110;

    try {
        await listener.onMessage(data, msg);
    }catch(err: any) {}

    expect(msg.ack).not.toHaveBeenCalled();
});