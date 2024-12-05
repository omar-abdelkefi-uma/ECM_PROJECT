import { Department } from "./department";
import { Experience } from "./experience";
import { User } from "./user";

export class Employee extends User{
    projectmanager:boolean;
    experiences:Experience[];
    departments:Department;
}