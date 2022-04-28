import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/models/user/module';
import { Permission } from 'src/app/models/user/permission';
import { Role } from 'src/app/models/user/role';
import { RoleService } from 'src/app/services/user/role.service';
export interface Task {
  module: string;
  name: string;
  completed: boolean;
  idper: number;
  subtasks?: Task[];
}
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  role: Role = new Role();
  mod: Module;
  permission: Permission;
  rolename: string;
  sexeg: string;
  tasks: Task[] = [
    {
      module: "Project",
      name: ' All Project',
      completed: false,
      idper: 0,
      subtasks: [
        { module: "Project", name: 'add project', idper: 1, completed: false },
        { module: "Project", name: 'delete project', idper: 2, completed: false },
        { module: "Project", name: 'consult project', idper: 3, completed: false },
        { module: "Project", name: 'edit project', idper: 4, completed: false },
      ],
    },
    {
      module: "Employee",
      name: 'All Employee',
      completed: false,
      idper: 0,
      subtasks: [
        { module: "Project", name: 'add employee', idper: 5, completed: false },
        { module: "Project", name: 'delete employee', idper: 6, completed: false },
        { module: "Project", name: 'consult employee', idper: 7, completed: false },
        { module: "Project", name: 'edit employee', idper: 8, completed: false },
      ],
    },
    {
      module: "Client",
      name: 'All Client',
      completed: false,
      idper: 0,
      subtasks: [
        { module: "Project", name: 'add client', idper: 9, completed: false },
        { module: "Project", name: 'delete client', idper: 10, completed: false },
        { module: "Project", name: 'consult client', idper: 11, completed: false },
        { module: "Project", name: 'edit client', idper: 12, completed: false },
      ],
    },
    {
      module: "Administrator",
      name: ' All Administrator',
      completed: false,
      idper: 0,
      subtasks: [
        { module: "Project", name: 'add administrator', idper: 13, completed: false },
        { module: "Project", name: 'delete administrator', idper: 14, completed: false },
        { module: "Project", name: 'consult administrator', idper: 15, completed: false },
        { module: "Project", name: 'edit administrator', idper: 16, completed: false },
      ],
    }
  ];
  allComplete(task: Task): boolean {
    const subtasks = task.subtasks;
    return task.completed || (subtasks != null && subtasks.every(t => t.completed));
  }
  someComplete(tasks: Task[]): boolean {
    const numComplete = tasks.filter(t => t.completed).length;
    return numComplete > 0 && numComplete < tasks.length;
  }
  //when check all object task and loop in task to set completed true
  setAllCompleted(tasks: Task[], completed: boolean) {
    tasks.forEach(t => (t.completed = completed));
  }
  getallchekked() {
    /***************************************valid************************** */
    if (this.rolegroup.get('roleControl').invalid || this.rolegroup.get('descriptionControl').invalid) {
    }
    /**************************invalid******************************** */
    else {
      this.role.permissions = [];
      this.tasks.forEach(task => {
        if (task.completed == true) {
          console.log("selected all");
          task.subtasks.forEach(subtask => {
            this.mod = new Module(subtask.module);
            this.permission = new Permission(this.mod, subtask.idper);
            this.role.permissions.push(this.permission);
          });
        }
        else {
          task.subtasks.forEach(subtask => {
            if (subtask.completed == true) {
              debugger;
              this.mod = new Module(subtask.module);
              this.permission = new Permission(this.mod, subtask.idper);
              this.role.permissions.push(this.permission);
            }
          }
          )
        }
      });
      this.roleService.createRole(this.role)
        .subscribe(data => console.log(data), error => console.log(error));
      this.router.navigate(['/alluser/listrole']);
    }
    this.router.navigate(['/alluser/listrole']);
  }
  rolegroup: FormGroup;
  description: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private roleService: RoleService, private router: Router) {
    this.rolegroup = this.fb.group({
      roleControl: ['', [Validators.required]],
      descriptionControl: ['', [Validators.required]]
    });
  }
  perrole: boolean = false;
  roles: Task[] = [];
  id: number;
  ngOnInit() {
    this.role = new Role();
    this.id = this.route.snapshot.params['id'];
    this.roleService.getRole(this.id)
      .subscribe(data => {
        this.role = data;
        this.role.permissions.forEach(permission => {
          this.tasks.forEach(task => {
            task.subtasks.forEach(subtask => {
              if (permission.id == subtask.idper) {
                subtask.completed = true;
              }
            });
          });
        });
        console.log(this.tasks)
      }
      );
  }
  listrole() {
    this.router.navigate(['/alluser/listrole']);
  }
}
