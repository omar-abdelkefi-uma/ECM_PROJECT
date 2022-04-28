import { Permission } from "./permission";

export class Role {
    id:Number;
    name:string;
    description:string;
    permissions:Permission[];
}
