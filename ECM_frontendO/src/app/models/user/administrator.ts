import { Experience } from "./experience";
import { Society } from "./society";
import { User } from "./user";

export class Administrator extends User{
    experiences:Experience[];
    superadmin:boolean;
    societies:Society[];
}