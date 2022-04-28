import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { Client } from 'src/app/models/user/client';
import { ClientService } from 'src/app/services/user/client.service';
import { DeleteComponent } from '../../delete/delete.component';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['no', 'avatar', 'Nomcomplet', 'username', 'city', 'phone', 'option'];
  dataSource: MatTableDataSource<Client>;
  isTableHasData = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private clientservice: ClientService, private router: Router) {
    this.titleService.setTitle("User | ECM");
  }
  ngOnInit(): void {
    this.reloadData();
  }
  //load data
  reloadData() {
    this.clientservice.getClientList()
      .subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<Client>(data);
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
  addclient() {
    this.router.navigate(["/alluser/addclient"]);
  }
  viewprofile(element) {
    this.router.navigate(['/alluser/profileclient', element.id]);
  }
  editclient(element) {
    this.router.navigate(['/alluser/editclient', element.id]);
  }
  deleteclient(id) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.clientservice.deleteClient(id)
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
function DeleteclientComponent(DeleteclientComponent: any) {
  throw new Error('Function not implemented.');
}
