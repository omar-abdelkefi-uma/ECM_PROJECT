import { Project } from "./project";
import { Task } from "./task";

export class Phase{
    id:number;
    name:string;
    orderId:number;
    tasks:Task[];
    project:Project;
}