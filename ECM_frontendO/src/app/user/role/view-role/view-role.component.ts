import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/user/permission';
import { Role } from 'src/app/models/user/role';
import { RoleService } from 'src/app/services/user/role.service';
export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private roleservice: RoleService, private router: Router, private route: ActivatedRoute) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  role: Role;
  id: number;
  //rolepermission:Permission []=[];
  adminpermission: Permission[] = [];
  projectpermission: Permission[] = [];
  employeepermission: Permission[] = [];
  clientpermission: Permission[] = [];
  ngOnInit(): void {
    this.role = new Role();
    debugger;
    this.roleservice.getRole(this.data.id)
      .subscribe(data => {
        this.role = data;
        this.role.permissions.forEach(permission => {
          /*  if(permission.module.moduleName=="Role")
            {
              this.rolepermission.push(permission);
            }*/
          if (permission.module.moduleName == "Project") {
            this.projectpermission.push(permission);
          }
          if (permission.module.moduleName == "Employee") {
            this.employeepermission.push(permission);
          }
          if (permission.module.moduleName == "Client") {
            this.clientpermission.push(permission);
          }
          if (permission.module.moduleName == "Administrator") {
            this.adminpermission.push(permission);
          }
        })
      });
  }
}
