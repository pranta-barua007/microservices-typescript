import { Publisher, Subjects, OrderCreatedEvent } from "@prbtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

