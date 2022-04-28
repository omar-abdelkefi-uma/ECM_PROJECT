import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { Task } from 'src/app/models/project/task';
import { MatDialogRef } from '@angular/material/dialog';
import { LazyLoadScriptService } from 'src/app/services/lazy-load-script.service';
import { PriorityTask } from 'src/app/models/project/prioritytask';
import { TypeTask } from 'src/app/models/project/typetask';
import { PrioritytaskService } from 'src/app/services/project/prioritytask.service';
import { TypetaskService } from 'src/app/services/project/typetask.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  //without project managers
  employeeSelectedValue: Employee;
  prioritytaskSelectedValue: PriorityTask;
  typetaskSelectedValue: TypeTask;
  employees: Employee[];
  prioritytasks: PriorityTask[];
  typetasks: TypeTask[];
  task: Task = new Task();
  projectgroup: FormGroup;
  constructor(private TypeTaskservice: TypetaskService, private PriorityTaskservice: PrioritytaskService, private lazyLoadService: LazyLoadScriptService, private fb: FormBuilder, private employeeservice: EmployeeService,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    this.projectgroup = this.fb.group({
      nameFormControl: ['', [Validators.required]],
      employeeFormControl: ['', [Validators.required]],
      prioritytaskFormControl: ['', [Validators.required]],
      typetaskFormControl: ['', [Validators.required]],
    });
  }
  ngAfterViewInit() {
    $(document).ready(function () {
    })
    /*  $(document).on("pageLoaded", function (){
        console.log("pageLoaded");
            $("#body").summernote({
                height: '200px',
                callbacks: {
                    onChange: function(contents, $editable) {
                        $("#body").val(contents);
                    }
                }
            });
      });*/
  }
  public duration: string;
  ngOnInit(): void {
    let jQueryInstance = this; // This line will assign all the angular instances to jQueryInstance variable.
    this.lazyLoadService.loadScript('/assets/jquery.durationpicker.js').subscribe(_ => {
      $(document).ready(function () {
        $('input[name=example6]').on("change", function () {
          $('#btn-example6').text("Duration (secs): " + $(this).val());
          jQueryInstance.duration = $(this).val().toString();
        });
        (<any>$('input[name=example6]')).durationpicker({ allowZeroTime: false })
        $(".duration-picker-container").css({ "font-size": "14px" });
        $(".duration-picker-container select").css({
          "width": "45px",
          "display": "inline-block",
          "height": "26px",
          "padding": "0",
          "box-sizing": "content-box",
          "border-radius": "3px",
          "margin-left": "10px",
          "background": "#fff",
          "border": "1px solid #e1e1e1",
          "font-size": "13px"
        });
      })
    });
    this.reloaddata();
  }
  reloaddata() {
    this.employeeservice.getEmployeeswithoutmanager()
      .subscribe(data => {
        this.employees = data;
      });
    this.PriorityTaskservice.getPriorityTasksList()
      .subscribe(data => {
        this.prioritytasks = data;
      });
    this.TypeTaskservice.getTypeTasksList()
      .subscribe(data => {
        this.typetasks = data;
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick() {
    this.task.employee = this.employeeSelectedValue;
    this.task.prioritytask = this.prioritytaskSelectedValue;
    this.task.typetask = this.typetaskSelectedValue;
    this.task.duration = +this.duration;
  }
}
