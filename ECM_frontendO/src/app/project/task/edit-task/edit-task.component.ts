import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/project/task';
export interface DialogData {
  microse: Task
}
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.projectgroup = this.fb.group({
      nameFormControl: ['', [Validators.required]],
      employeeFormControl: ['', [Validators.required]],
      prioritytaskFormControl: ['', [Validators.required]],
      typetaskFormControl: ['', [Validators.required]],
    });
   }
  task: Task = new Task();
  ngOnInit(): void {
    this.task = this.data.microse;
  }
  projectgroup: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }

 
   
 
}
