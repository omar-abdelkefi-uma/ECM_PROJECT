import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { Administrator } from 'src/app/models/user/administrator';
import { AdminService } from 'src/app/services/user/admin.service';
import { DeleteComponent } from '../../delete/delete.component';
import { SocietyService } from 'src/app/services/user/society.service';
import { Society } from 'src/app/models/user/society';
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  displayedColumns: string[] = ['no', 'avatar', 'Nomcomplet', 'username', 'city', 'phone', 'option'];
  dataSource: MatTableDataSource<Administrator>;
  isTableHasData = true;
  filtersocieties: any;
  isalladmin=false;
  administrators: Administrator[];
  filteradministrators: Administrator[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private societyservice: SocietyService, private titleService: Title, public dialog: MatDialog, private administratorservice: AdminService, private router: Router) {
    this.titleService.setTitle("User | ECM");
  }
  selected = "All societies";
  select(p: string) {
    this.selected = p;
    if (this.selected == "All societies") {
      this.filteradministrators = this.administrators.filter(admin => admin.superadmin == true);
      this.dataSource.data = this.filteradministrators;
    } else {
      this.filteradministrators = [];
      let filteradministrator = this.administrators.forEach(admin => {
        let filterad = admin.societies.filter(soc => (soc.name == p));
        if (filterad.length != 0) {
          this.filteradministrators.push(admin);
        }
      });
      this.dataSource.data = this.filteradministrators;
    }
  }
  ngOnInit(): void {
    this.societyservice.getSocietyList()
      .subscribe(data => {
        this.filtersocieties = data;
      });
    this.reloadData();
  }
  //load data
  reloadData() {
    this.administratorservice.getadministratorList()
      .subscribe(data => {
        console.log(data)
        this.administrators = data;
        this.filteradministrators = this.administrators.filter(admin => admin.superadmin == true);
        this.dataSource = new MatTableDataSource<Administrator>(this.filteradministrators);
        this.dataSource.data = this.filteradministrators;
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
  addadministrator() {
    this.router.navigate(["/alluser/addadministrator"]);
  }
  viewprofile(element) {
    this.router.navigate(['/alluser/profileadministrator', element.id]);
  }
  editadmin(element) {
    this.router.navigate(['/alluser/editadministrator', element.id]);
  }
  deleteadmin(id) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.administratorservice.deleteadministrator(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
            error => console.log(error));
      }
    });
  }
  checkalladmin(){
    this.isalladmin=!this.isalladmin;
    debugger;
    if(this.isalladmin){
      this.dataSource.data=this.administrators;
    }else{
      this.dataSource.data=this.filteradministrators;
    }
  }
}
