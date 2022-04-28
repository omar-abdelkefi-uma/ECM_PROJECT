import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project/project';
import { Ticket } from 'src/app/models/project/ticket';
import { ProjectService } from 'src/app/services/project/project.service';
import { TicketService } from 'src/app/services/project/ticket.service';
@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  id: number;
  ticketgroup: FormGroup;
  ticket: Ticket = new Ticket();
  projectSelectedValue: Project;
  prioritySelectedValue: string = 'undefined';
  projects: Project[];
  priorityTickets = ['undefined', 'normal', 'immediate', 'high', 'low', 'urgent'];
  constructor(private route: ActivatedRoute, private projectservice: ProjectService, private ticketservice: TicketService, private fb: FormBuilder, private router: Router) {
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
    this.id = this.route.snapshot.params['id'];
    this.projectservice.getProjectsList()
      .subscribe(data => {
        this.projects = data;
      });
    this.ticketservice.getTicket(this.id)
      .subscribe(data => {
        this.ticket = data;
        this.projectSelectedValue = this.ticket.project;
        this.prioritySelectedValue = this.ticket.priority;
      })
  }
  Editticket() {
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
  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
}
