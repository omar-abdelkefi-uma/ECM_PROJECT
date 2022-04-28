import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { PriorityTask } from 'src/app/models/project/prioritytask';
import { DeleteComponent } from 'src/app/project/delete/delete.component';
import { PrioritytaskService } from 'src/app/services/project/prioritytask.service';
import { AddPriorityTaskComponent } from '../add-priority-task/add-priority-task.component';
import { EditPriorityTaskComponent } from '../edit-priority-task/edit-priority-task.component';
@Component({
  selector: 'app-list-priority-task',
  templateUrl: './list-priority-task.component.html',
  styleUrls: ['./list-priority-task.component.css']
})
export class ListPriorityTaskComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'option'];
  dataSource: MatTableDataSource<PriorityTask>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private PriorityTaskservice: PrioritytaskService) {
    this.titleService.setTitle("PriorityTask | ECM");
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
    const dialogRef = this.dialog.open(EditPriorityTaskComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      debugger;
      this.PriorityTaskservice.updatePriorityTask(result)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    });
  }
  addPriorityTask() {
    const dialogRef = this.dialog.open(AddPriorityTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        this.PriorityTaskservice.createPriorityTask(result)
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
        this.PriorityTaskservice.deletePriorityTask(id)
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
    this.PriorityTaskservice.getPriorityTasksList()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<PriorityTask>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      });
  }
}