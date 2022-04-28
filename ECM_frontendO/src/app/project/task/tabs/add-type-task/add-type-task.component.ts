import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TypeTask } from 'src/app/models/project/typetask';
@Component({
  selector: 'app-add-type-task',
  templateUrl: './add-type-task.component.html',
  styleUrls: ['./add-type-task.component.css']
})
export class AddTypeTaskComponent implements OnInit {
  typeTask: TypeTask = new TypeTask();
  constructor(public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<AddTypeTaskComponent>) { }
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
