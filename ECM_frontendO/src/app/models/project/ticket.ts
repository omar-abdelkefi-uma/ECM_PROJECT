import { Employee } from "../user/employee";
import { User } from "../user/user";
import { Project } from "./project";

export class Ticket{
    id:number;
    topic:string;
    status:string;
    priority:string;
    project:Project;
    start:Date;
    end:Date;
    //ticket creator
    user:User;
    //assignto
    employee:Employee;
}