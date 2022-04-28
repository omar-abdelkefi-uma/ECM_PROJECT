import { Employee } from "../user/employee";
import { Phase } from "./phase";
import { PriorityTask } from "./prioritytask";
import { Project } from "./project";
import { TypeTask } from "./typetask";

export class Task {
    id: number;
    name: string;
    code: string;
    status: string;
    start: Date;
    duration: number;
    durationwithday: boolean;
    project: Project;
    document: Document;
    prioritytask: PriorityTask;
    typetask: TypeTask;
    employee: Employee;
    phase: Phase;
    level: number;
}