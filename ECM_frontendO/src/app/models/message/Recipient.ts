import { User } from "../user/user";
import { Message } from "./message";

export class Recipient {
    id:Number;
    user:User;
    message:Message;
    containgroup:boolean;
}