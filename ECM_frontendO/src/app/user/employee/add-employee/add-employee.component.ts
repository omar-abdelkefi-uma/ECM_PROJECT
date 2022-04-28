import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/user/experience';
import { Image as Alias } from 'src/app/models/user/image';
import { Role } from 'src/app/models/user/role';
import { RoleService } from 'src/app/services/user/role.service';
import icons from 'glyphicons';
import { Employee } from 'src/app/models/user/employee';
import { EmployeeService } from 'src/app/services/user/employee.service';
import { Department } from 'src/app/models/user/Department';
import { DepartmentService } from 'src/app/services/user/department.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  isLinear = false;
  Employee: Employee = new Employee();
  roles: Role[];
  RoleSelectedValue: number;
  hide: boolean = true;
  completename: String;
  @ViewChild('fileInput') el: ElementRef;
  cardImageBase64: string;
  imageError: string;
  isImageSaved: boolean;
  selectedValueexperience: string;
  plusIcon = icons.plus;
  minusIcon = icons.plus;
  files: File[] = new Array<File>();
  selectedFiles: FileList;
  isprojectmanager: boolean = false;
  departments: Department;
  departmentSelectedValue: Department;
  constructor(private departmentservice: DepartmentService, private Employeeservice: EmployeeService, private roleservice: RoleService, private router: Router, private _formBuilder: FormBuilder) {
    7
  }
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });
    this.departmentservice.getDepartmentList()
      .subscribe(data => {
        this.departments = data;
      });
  }
  /*-----------------------------------------step 1------------------------------------------*/
  //Nom
  fullnameControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //date
  startDate = new Date(1970, 0, 1);
  startexp = new Date(2018, 0, 1);
  //Function to testdate
  testDate(dateofb) {
    var timeDiff = Math.abs(Date.now() - dateofb);
    if (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) < 20) {
      return true;
    }
    else {
      return false;
    }
  }
  dateControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //lieu
  lieuControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //sexe
  sexe = [
    { value: 'Femme', viewValue: 'F' },
    { value: 'Homme', viewValue: 'H' },
  ];
  sexeControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //CIN
  cinControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  //username
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  //tel
  TelControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  departmentFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //Ville
  villeControl = new FormControl();
  villeGroups = [
    {
      name: 'Tunisia',
      ville: [
        { value: 'Tunis', viewValue: 'Tunis' },
        { value: 'Sfax', viewValue: 'Sfax' },
        { value: 'Gabes', viewValue: 'Gabes' },
        { value: 'Gafsa', viewValue: 'Gafsa' },
        { value: 'Sousse', viewValue: 'Sousse' }
      ]
    },
    {
      name: 'France',
      ville: [
        { value: 'Paris', viewValue: 'Paris' },
        { value: 'Lille', viewValue: 'Lille' },
        { value: 'Lyon', viewValue: 'Lyon' }
      ]
    },
    {
      name: 'Espagne',
      ville: [
        { value: 'Madrid', viewValue: 'Madrid' },
        { value: 'Barcelona', viewValue: 'Barcelona' },
        { value: 'Las Palmas', viewValue: 'Las Palmas' }
      ]
    },
  ];
  roleFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  goForward(stepper: MatStepper) {
    if (this.usernameFormControl || this.sexeControl.invalid || this.fullnameControl.invalid || this.dateControl.invalid || this.lieuControl.invalid || this.cinControl.invalid) {
      stepper.ngAfterContentInit();
      return true;
    }
    else {
      stepper.next();
      return false;
    }
  }
  /*-----------------------------------------------------------------step 2-----------------------*/
  experience = [
    { value: 'Débutant', viewValue: 'Débutant' },
    { value: 'de 1-5 ans', viewValue: 'de 1-5 ans' },
    { value: 'de 6-10 ans', viewValue: 'de 6-10 ans' },
    { value: 'plus 10 ans', viewValue: 'plus 10 ans' },
  ];
  listExp: Experience[] = [{ 'duration': null, 'position': '', 'company': '' }];
  goForward2(stepper: MatStepper) {
  }
  visibleexp() {
    if (this.selectedValueexperience == 'Débutant' || this.selectedValueexperience == null) {
      return true;
    }
    else
      return false;
  }
  clickadd(): void {
    this.listExp.push({ 'duration': null, 'position': '', 'company': '' });
  }
  clickdelete(i): void {
    this.listExp.splice(i, 1);
  }
  checkisprojectman() {
    this.isprojectmanager = !this.isprojectmanager;
  }
  /*-----------------------------------------step 3------------------------------------------*/
  /*########################## File Upload ########################*/
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.Employee.imageprofile = new Alias();
            this.Employee.imageprofile.imageid = this.cardImageBase64.substring(23);
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  AddEmployee() {
    this.Employee.projectmanager = this.isprojectmanager;
    this.Employee.departments = this.departmentSelectedValue;
    debugger;
    this.roles.forEach(role => {
      //RoleSelectedValue ==>le nom du role selected
      if (role.id == this.RoleSelectedValue) {
        //il suffit do donner role id du role choisit 
        this.Employee.role = role;
      }
    });
    const formData: FormData = new FormData();
    this.files.forEach(element => {
      formData.append('files', element);
    });
    this.Employee.experiences = this.listExp;
    formData.append('employee', JSON.stringify(this.Employee));
    debugger;
    this.Employeeservice.addEmployee(formData)
      .subscribe(data => {
        debugger;
        console.log(data);
        this.router.navigate(["/alluser/employee"]);
      },
        error => {
          debugger;
          console.log(error);
        }
      );
  }
  listEmployee() {
    this.router.navigate(["/alluser/employee"]);
  }
  /************************step document */
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.files.push(this.selectedFiles.item(0));
  }
  deleteDocument(i): void {
    this.files.splice(i, 1);
  }
}
