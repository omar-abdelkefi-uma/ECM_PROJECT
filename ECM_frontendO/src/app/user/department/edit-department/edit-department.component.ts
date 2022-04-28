import { ChangeDetectorRef, ElementRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/models/user/Department';
import { Society } from 'src/app/models/user/society';
import { SocietyService } from 'src/app/services/user/society.service';
export interface DialogData {
  microse: Department
}
@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  societies: Society[];
  department: Department;
  constructor(private Societyservice: SocietyService, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<EditDepartmentComponent>) {
  }
  //Nom
  FormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }
  societySelectedValue: number;
  ngOnInit() {
    this.department = new Department();
    this.department.id = this.data.microse.id;
    this.department.name = this.data.microse.name;
    this.department.email = this.data.microse.email;
    this.societySelectedValue = this.data.microse.society.id;
    this.Societyservice.getSocietyList()
      .subscribe(data => {
        console.log(data);
        this.societies = data;
      });
  }
  editdepartment() {
    debugger;
    this.societies.forEach(society => {
      //RoleSelectedValue ==>le nom du role selected
      if (society.id == this.societySelectedValue) {
        this.department.society = society;
      }
    });
  }
}
