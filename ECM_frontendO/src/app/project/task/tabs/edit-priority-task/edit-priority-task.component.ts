import { Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriorityTask } from 'src/app/models/project/prioritytask';
export interface DialogData {
  microse: PriorityTask
}
@Component({
  selector: 'app-edit-priority-task',
  templateUrl: './edit-priority-task.component.html',
  styleUrls: ['./edit-priority-task.component.css']
})
export class EditPriorityTaskComponent implements OnInit {
  priorityTask: PriorityTask = new PriorityTask();
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<EditPriorityTaskComponent>) { }
  ngOnInit(): void {
    this.priorityTask = this.data.microse;
  }
  //Nom
  FormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  onNoClick(): void {
    this.dialogRef.close();
  }
}
