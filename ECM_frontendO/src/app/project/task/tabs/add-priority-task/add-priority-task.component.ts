import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PriorityTask } from 'src/app/models/project/prioritytask';
@Component({
  selector: 'app-add-priority-task',
  templateUrl: './add-priority-task.component.html',
  styleUrls: ['./add-priority-task.component.css']
})
export class AddPriorityTaskComponent implements OnInit {
  priorityTask: PriorityTask = new PriorityTask();
  constructor(public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<AddPriorityTaskComponent>) { }
  ngOnInit(): void {
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
