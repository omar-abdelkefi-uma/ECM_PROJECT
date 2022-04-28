import { Module } from "./module";

export class Permission {
        id:number;
        permission_name:string;
        module:Module;
constructor(module:Module,id:number){
        this.id=id;
      
        this.module = new Module(module.moduleName);
}
       
        
}
