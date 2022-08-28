import { Publisher, Subjects, TicketCreatedEvent } from "@prbtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
