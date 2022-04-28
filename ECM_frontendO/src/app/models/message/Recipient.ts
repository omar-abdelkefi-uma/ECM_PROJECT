import { User } from "../user/user";
import { Message } from "./Message";

export class Recipient {
    id:Number;
    user:User;
    message:Message;
    containgroup:boolean;
}