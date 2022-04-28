import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project/project';
import { TypeProject } from 'src/app/models/project/typeproject';
import { Client } from 'src/app/models/user/client';
import { Employee } from 'src/app/models/user/employee';
import { ProjectService } from 'src/app/services/project/project.service';
import { TypeprojectService } from 'src/app/services/project/typeproject.service';
import { ClientService } from 'src/app/services/user/client.service';
import { EmployeeService } from 'src/app/services/user/employee.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  startDate = new Date();
  projectgroup: FormGroup;
  project: Project = new Project();
  clientSelectedValue: Client;
  employeeSelectedValue: Employee[];
  typeprojectSelectedValue: TypeProject;
  projectmanagerSelectedValue: Employee;
  statusSelectedValue: string = 'undefined';
  clients: Client[];
  projectmanagers: Employee[];
  employees: Employee[];
  typeprojects: TypeProject[];
  statusProject = ['undefined', 'suspended', 'active'];
  constructor(private router: Router, private employeeservice: EmployeeService, private fb: FormBuilder, private typeprojectservice: TypeprojectService, private clientservice: ClientService, private Projectservice: ProjectService) {
    this.projectgroup = this.fb.group({
      projectControl: ['', [Validators.required]],
      descriptionControl: ['', [Validators.required]],
      projectnameControl: ['', [Validators.required]],
      clientFormControl: ['', [Validators.required]],
      statusFormControl: ['', [Validators.required]],
      typeprojectFormControl: ['', [Validators.required]],
      startFormControl: ['', [Validators.required]],
      endFormControl: ['', [Validators.required]],
      projectmanagerFormControl: ['', [Validators.required]],
      employeeFormControl: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.reloaddata();
  }
  reloaddata() {
    this.clientservice.getClientList()
      .subscribe(data => {
        this.clients = data;
      });
    this.typeprojectservice.getTypeProjectsList()
      .subscribe(data => {
        this.typeprojects = data;
      });
    this.employeeservice.getEmployeeswithoutmanager()
      .subscribe(data => {
        this.employees = data;
      });
    this.employeeservice.getProjectMangers()
      .subscribe(data => {
        this.projectmanagers = data;
      });
  }
  Addproject() {
    this.project.employees = this.employeeSelectedValue;
    this.project.client = this.clientSelectedValue;
    this.project.typeproject = this.typeprojectSelectedValue;
    this.project.projectmanager = this.projectmanagerSelectedValue;
    this.project.status = this.statusSelectedValue;
    this.Projectservice.createProject(this.project)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(["/allproject/project"]);
      },
        error => {
          console.log(error);
        }
      );
  }
}
