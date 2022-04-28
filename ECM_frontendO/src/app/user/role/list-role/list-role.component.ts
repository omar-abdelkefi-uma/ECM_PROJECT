import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/user/role';
import { RoleService } from 'src/app/services/user/role.service';
import { DeleteRoleComponent } from '../delete-role/delete-role.component';
import { ViewRoleComponent } from '../view-role/view-role.component';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  displayedColumns: string[] = ['no', 'role', 'description', 'option'];
  dataSource: MatTableDataSource<Role>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private roleservice: RoleService, private router: Router) {
    this.titleService.setTitle("Role | ECM");
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
  view(element) {
    const dialogRef = this.dialog.open(ViewRoleComponent, {
      width: '450px',
      data: { id: element.id },
      panelClass: 'viewrole'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  edit(element) {
    this.router.navigate(['/alluser/editrole', element.id]);
  }
  addrole() {
    this.router.navigate(['/alluser/addrole']);
  }
  //delete
  openDialog(id) {
    const dialogRef = this.dialog.open(DeleteRoleComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.roleservice.deleteRole(id)
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
    this.roleservice.getRolesList()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Role>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      });
  }
}
