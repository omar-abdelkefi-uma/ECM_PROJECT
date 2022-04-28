import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Society } from 'src/app/models/user/society';
import { SocietyService } from 'src/app/services/user/society.service';
import { AddSocietyComponent } from '../add-society/add-society.component';
import { DeleteSocietyComponent } from '../delete-society/delete-society.component';
import { EditSocietyComponent } from '../edit-society/edit-society.component';
import { ViewSocietyComponent } from '../view-society/view-society.component';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-list-society',
  templateUrl: './list-society.component.html',
  styleUrls: ['./list-society.component.css']
})
export class ListSocietyComponent implements OnInit {
  displayedColumns: string[] = ['no', 'avatar', 'name', 'city', 'email', 'address', 'phone', 'postal', 'option'];
  dataSource: MatTableDataSource<Society>;
  isTableHasData = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private Societyservice: SocietyService, private router: Router) {
    this.titleService.setTitle("Society | ECM");
  }
  onFilterClick(event) {
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
  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  view(element) {
    const dialogRef = this.dialog.open(ViewSocietyComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  edit(element) {
    const dialogRef = this.dialog.open(EditSocietyComponent, {
      width: '450px',
      data: { microse: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.Societyservice.updateSociety(result)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    });
  }
  addsociety() {
    const dialogRef = this.dialog.open(AddSocietyComponent);
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result !== undefined) {
        console.log(`Dialog result: ${result}`);
        this.Societyservice.createSociety(result)
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
    const dialogRef = this.dialog.open(DeleteSocietyComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.Societyservice.deleteSociety(id)
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
  ajouterSociety: boolean = false;
  consulterSociety: boolean = false;
  supprimerSociety: boolean = false;
  modifierSociety: boolean = false;
  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.Societyservice.getSocietyList()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Society>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      });
  }
}
