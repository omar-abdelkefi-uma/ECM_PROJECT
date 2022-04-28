import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/user/Department';
import { DepartmentService } from 'src/app/services/user/department.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { ViewDepartmentComponent } from '../view-department/view-department.component';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {
  displayedColumns: string[] = ['no',  'name','company', 'city', 'email', 'option'];
  dataSource: MatTableDataSource<Department>;
  isTableHasData = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private Departmentservice: DepartmentService, private router: Router) {
    this.titleService.setTitle("Departments | ECM");
  }
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
  view(element) {
    const dialogRef = this.dialog.open(ViewDepartmentComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  edit(element) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.Departmentservice.updateDepartment(result)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    });
  }
  addDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent);
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        this.Departmentservice.createDepartment(result)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
  //delete
  openDialog(id) {
    const dialogRef = this.dialog.open(DeleteDepartmentComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.Departmentservice.deleteDepartment(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
  /*******************************************************permissions of user*/
  ajouterDepartment: boolean = false;
  consulterDepartment: boolean = false;
  supprimerDepartment: boolean = false;
  modifierDepartment: boolean = false;
  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.Departmentservice.getDepartmentList()
      .subscribe(data => {
        console.log(data);
        debugger
        this.dataSource = new MatTableDataSource<Department>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      });
  }
}
