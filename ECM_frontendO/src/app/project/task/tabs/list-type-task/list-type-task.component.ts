import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TypeTask } from 'src/app/models/project/typetask';
import { DeleteComponent } from 'src/app/project/delete/delete.component';
import { TypetaskService } from 'src/app/services/project/typetask.service';
import { AddTypeTaskComponent } from '../add-type-task/add-type-task.component';
import { EditTypeTaskComponent } from '../edit-type-task/edit-type-task.component';
@Component({
  selector: 'app-list-type-task',
  templateUrl: './list-type-task.component.html',
  styleUrls: ['./list-type-task.component.css']
})
export class ListTypeTaskComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'option'];
  dataSource: MatTableDataSource<TypeTask>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private TypeTaskservice: TypetaskService) {
    this.titleService.setTitle("TypeTask | ECM");
  }
  isTableHasData = true;
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
  edit(element) {
    const dialogRef = this.dialog.open(EditTypeTaskComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      debugger;
      this.TypeTaskservice.updateTypeTask(result)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    });
  }
  addTypeTask() {
    const dialogRef = this.dialog.open(AddTypeTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        this.TypeTaskservice.createTypeTask(result)
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
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.TypeTaskservice.deleteTypeTask(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.TypeTaskservice.getTypeTasksList()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<TypeTask>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      });
  }
}
