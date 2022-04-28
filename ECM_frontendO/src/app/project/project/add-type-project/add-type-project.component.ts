import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TypeProject } from 'src/app/models/project/typeproject';
@Component({
  selector: 'app-add-type-project',
  templateUrl: './add-type-project.component.html',
  styleUrls: ['./add-type-project.component.css']
})
export class AddTypeProjectComponent implements OnInit {
  typeproject: TypeProject = new TypeProject();
  constructor(public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<AddTypeProjectComponent>) { }
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
