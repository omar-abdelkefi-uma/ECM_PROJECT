import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project/project';
import { Ticket } from 'src/app/models/project/ticket';
import { ProjectService } from 'src/app/services/project/project.service';
import { TicketService } from 'src/app/services/project/ticket.service';
@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  ticketgroup: FormGroup;
  ticket: Ticket = new Ticket();
  projectSelectedValue: Project;
  prioritySelectedValue: string = 'undefined';
  projects: Project[];
  priorityTickets = ['undefined', 'normal', 'immediate', 'high', 'low', 'urgent'];
  constructor(private projectservice: ProjectService, private ticketservice: TicketService, private fb: FormBuilder, private router: Router) {
    this.ticketgroup = this.fb.group({
      ticketControl: ['', [Validators.required]],
      projectnameFormControl: ['', [Validators.required]],
      priorityFormControl: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.reloaddata();
  }
  reloaddata() {
    this.projectservice.getProjectsList()
      .subscribe(data => {
        this.projects = data;
      });
  }
  Addticket() {
    debugger
    this.ticket.project = this.projectSelectedValue;
    this.ticket.priority = this.prioritySelectedValue;
    this.ticketservice.createTicket(this.ticket)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(["/allproject/ticket"]);
      },
        error => {
          console.log(error);
        }
      );
  }
}
