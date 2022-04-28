import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/project/ticket';
import { TicketService } from 'src/app/services/project/ticket.service';
@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {
  isTableHasData = true;
  displayedColumns: string[] = ['no', 'topic', 'status', 'priority', 'client', 'project', 'option'];
  dataSource: MatTableDataSource<Ticket>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private titleService: Title, public dialog: MatDialog, private ticketservice: TicketService, private router: Router) {
    this.titleService.setTitle("Ticket | ECM");
  }
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.ticketservice.getTicketsList()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Ticket>(data);
        //get data from 
        this.dataSource.data = data;
        // // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
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
  addticket() {
    this.router.navigate(['/allproject/addticket']);
  }
  edittask(element) {
    this.router.navigate(['/allproject/editticket', element.id]);
  }
}
