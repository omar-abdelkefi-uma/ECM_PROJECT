import {Document} from "../user/document";
import { User } from "../user/user";
import { Recipient } from "./Recipient";
export class Message {
    id:Number;
    content:string;
    dateCreation:Date;
    documents:Document[];
    recipient:Recipient;
    user:User;
    /*optional*/
    delivered:boolean;
    read:boolean;
    systemNotify:boolean;
    sender:string;
}