import { Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeProject } from 'src/app/models/project/typeproject';
export interface DialogData {
  microse: TypeProject
}
@Component({
  selector: 'app-edit-type-project',
  templateUrl: './edit-type-project.component.html',
  styleUrls: ['./edit-type-project.component.css']
})
export class EditTypeProjectComponent implements OnInit {
  typeproject: TypeProject = new TypeProject();
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<EditTypeProjectComponent>) { }
  ngOnInit(): void {
    this.typeproject = this.data.microse;
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
