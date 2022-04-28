import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/models/user/Department';
import { Society } from 'src/app/models/user/society';
import { SocietyService } from 'src/app/services/user/society.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  societies: Society[];
  department: Department;
  constructor(private Societyservice: SocietyService, public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<AddDepartmentComponent>) {
  }
  //Name
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
    this.Societyservice.getSocietyList()
      .subscribe(data => {
        console.log(data);
        this.societies = data;
      });
  }
  adddepartment() {
    debugger;
    this.societies.forEach(society => {
      //RoleSelectedValue ==>le nom du role selected
      if (society.id == this.societySelectedValue) {
        this.department.society = society;
      }
    });
  }
}
