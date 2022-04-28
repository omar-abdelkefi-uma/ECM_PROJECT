import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { Employee } from 'src/app/models/user/employee';
import { EmployeeService } from 'src/app/services/user/employee.service';
import { DeleteComponent } from '../../delete/delete.component';
import { Department } from 'src/app/models/user/Department';
import { DepartmentService } from 'src/app/services/user/department.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['no', 'avatar', 'Nomcomplet', 'username', 'city', 'phone', 'option'];
  dataSource: MatTableDataSource<Employee>;
  isTableHasData = true;
  employees: Employee[];
  filteremployees: Employee[] = [];
  filterdepartments: Department[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private Departmentservice: DepartmentService, private titleService: Title, public dialog: MatDialog, private employeeservice: EmployeeService, private router: Router) {
    this.titleService.setTitle("User | ECM");
  }
  selected = "All Employees";
  selecteddepart = "All departments";
  //when select department
  selectde(de: string) {
    this.selecteddepart = de;
    if (this.selecteddepart == "All departments") {
      if (this.selected == "All Employees") {
        this.filteremployees = this.employees;
      }
      else {
        if (this.selected == "project manager") {
          this.filteremployees = this.employees.filter(emp => emp.projectmanager == true);
        } else {
          this.filteremployees = this.employees.filter(emp => emp.projectmanager == true);
        }
      }
    }
    else {
      if (this.selected == "All Employees") {
        this.filteremployees = this.employees.filter(emp => emp.departments.name == this.selecteddepart);
      }
      else {
        if (this.selected == "project manager") {
          this.filteremployees = this.employees.filter(emp => emp.projectmanager == true && emp.departments.name == this.selecteddepart);
        } else {
          this.filteremployees = this.employees.filter(emp => emp.projectmanager == false && emp.departments.name == this.selecteddepart);
        }
      }
    }
    this.dataSource.data = this.filteremployees;
  }
  //when select type of project
  select(p: string) {
    this.selected = p;
    if (this.selected == "All Employees") {
      if (this.selecteddepart == "All departments") {
        this.filteremployees = this.employees;
      }
      else {
        this.filteremployees = this.employees.filter(emp => emp.departments.name == this.selecteddepart);
      }
      this.dataSource.data = this.filteremployees;
    }
    if (this.selected == "project manager") {
      if (this.selecteddepart == "All departments") {
        this.filteremployees = this.employees.filter(emp => emp.projectmanager == true);
      }
      else {
        this.filteremployees = this.employees.filter(emp => emp.projectmanager == true && emp.departments.name == this.selecteddepart);
      }
      this.dataSource.data = this.filteremployees;
    }
    if (this.selected == "employee") {
      if (this.selecteddepart == "All departments") {
        this.filteremployees = this.employees.filter(emp => emp.projectmanager == false);
      }
      else {
        this.filteremployees = this.employees.filter(emp => emp.projectmanager == false && emp.departments.name == this.selecteddepart);
      }
      this.dataSource.data = this.filteremployees;
    }
    debugger;
    console.log(this.selected)
    console.log(this.selecteddepart)
  }
  ngOnInit(): void {
    this.Departmentservice.getDepartmentList()
      .subscribe(data => {
        this.filterdepartments = data;
      });
    this.reloadData();
  }
  //load data
  reloadData() {
    this.employeeservice.getEmployees()
      .subscribe(data => {
        console.log(data)
        this.employees = data;
        this.dataSource = new MatTableDataSource<Employee>(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
  }
  //search data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addemployee() {
    this.router.navigate(["/alluser/addemployee"]);
  }
  viewprofile(element) {
    this.router.navigate(['/alluser/profileemployee', element.id]);
  }
  editemployee(element) {
    this.router.navigate(['/alluser/editemployee', element.id]);
  }
  deleteemployee(id) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.employeeservice.deleteEmployee(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
}
