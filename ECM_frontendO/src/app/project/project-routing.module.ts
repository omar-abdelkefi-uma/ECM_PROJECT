import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { EditPeojectComponent } from './project/edit-peoject/edit-peoject.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { AddTicketComponent } from './ticket/add-ticket/add-ticket.component';
import { EditTicketComponent } from './ticket/edit-ticket/edit-ticket.component';
import { ListTicketComponent } from './ticket/list-ticket/list-ticket.component';

const routes: Routes = [
  { path: 'project', component: ListProjectComponent  },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'editproject/:id', component: EditPeojectComponent  },
  { path: 'viewproject/:id', component: ViewProjectComponent  },
  { path: 'task/:id', component: ListTaskComponent},
  { path: 'ticket', component: ListTicketComponent},
  { path: 'addticket', component: AddTicketComponent},
  { path: 'editticket/:id', component: EditTicketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
