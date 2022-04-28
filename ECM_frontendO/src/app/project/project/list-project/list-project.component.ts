import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project/project';
import { TypeProject } from 'src/app/models/project/typeproject';
import { ProjectService } from 'src/app/services/project/project.service';
import { TypeprojectService } from 'src/app/services/project/typeproject.service';
import { AddTypeProjectComponent } from '../add-type-project/add-type-project.component';
import { DeleteTypeProjectComponent } from '../delete-type-project/delete-type-project.component';
import { EditTypeProjectComponent } from '../edit-type-project/edit-type-project.component';
@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  isTableHasData = true;
  displayedColumns: string[] = ['no', 'code', 'name', 'option'];
  dataSource: MatTableDataSource<Project>;
  isTableHasDatatype = true;
  displayedColumnstype: string[] = ['no', 'name', 'option'];
  dataSourcetype: MatTableDataSource<TypeProject>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('paginatortype') paginatortype: MatPaginator;
  constructor(private typeprojectservice: TypeprojectService, private Projectservice: ProjectService, private router: Router, private titleService: Title, public dialog: MatDialog) {
    this.titleService.setTitle("Project | ECM");
  }
  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.Projectservice.getProjectsList()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Project>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      });
    this.typeprojectservice.getTypeProjectsList()
      .subscribe(data => {
        console.log(data);
        this.dataSourcetype = new MatTableDataSource<Project>(data);
        //get data from 
        this.dataSourcetype.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSourcetype.paginator = this.paginatortype;
      });
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
  applyFiltertype(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcetype.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcetype.filteredData.length > 0) {
      this.isTableHasDatatype = true;
    } else {
      this.isTableHasDatatype = false;
    }
    if (this.dataSourcetype.paginator) {
      this.dataSourcetype.paginator.firstPage();
    }
  }
  editptoject(element) {
    this.router.navigate(['/allproject/editproject', element.id]);
  }
  addproject() {
    this.router.navigate(['/allproject/addproject']);
  }
  addtypeproject() {
    const dialogRef = this.dialog.open(AddTypeProjectComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        this.typeprojectservice.createTypeProject(result)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
  edit(element) {
    const dialogRef = this.dialog.open(EditTypeProjectComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      debugger;
      this.typeprojectservice.updateTypeProject(result)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    });
  }
  //delete project
  openDialogproject(id) {
    const dialogRef = this.dialog.open(DeleteTypeProjectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.Projectservice.deleteProject(id)
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
    const dialogRef = this.dialog.open(DeleteTypeProjectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.typeprojectservice.deleteTypeProject(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
  task(element) {
    this.router.navigate(['/allproject/task', element.id]);
  }
}
