import { Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeTask } from 'src/app/models/project/typetask';
export interface DialogData {
  microse: TypeTask
}
@Component({
  selector: 'app-edit-type-task',
  templateUrl: './edit-type-task.component.html',
  styleUrls: ['./edit-type-task.component.css']
})
export class EditTypeTaskComponent implements OnInit {
  typeTask: TypeTask = new TypeTask();
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<EditTypeTaskComponent>) { }
  ngOnInit(): void {
    this.typeTask = this.data.microse;
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
