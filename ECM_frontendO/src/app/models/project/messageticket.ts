import { Ticket } from "./ticket";

export class MessageTicket{
    id:number;
    status:string;
    priority:string;
    message:string;
    lastmodification:Date;
    ticket:Ticket;
}