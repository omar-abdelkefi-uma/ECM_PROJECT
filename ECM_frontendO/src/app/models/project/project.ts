import { Client } from "../user/client";
import { Employee } from "../user/employee";
import { TypeProject } from "./typeproject";

export class Project{
    id:number;
    name:string;
    code:string;
    status:string;
    description:string;
    start:Date;
    end:Date;
    duration:number;
    progress:number;
    typeproject:TypeProject;
    projectmanager:Employee;
    employees:Employee[];
    client:Client;
   
}