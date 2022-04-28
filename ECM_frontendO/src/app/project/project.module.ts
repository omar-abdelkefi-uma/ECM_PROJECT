import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { DeleteProjectComponent } from './project/delete-project/delete-project.component';
import { EditPeojectComponent } from './project/edit-peoject/edit-peoject.component';
import { SharedmModule } from '../sharedm/sharedm.module';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { ListTicketComponent } from './ticket/list-ticket/list-ticket.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { AddTypeProjectComponent } from './project/add-type-project/add-type-project.component';
import { EditTypeProjectComponent } from './project/edit-type-project/edit-type-project.component';
import { DeleteTypeProjectComponent } from './project/delete-type-project/delete-type-project.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { DragtestComponent } from './task/tabs/dragtest/dragtest.component';
import { AddPhaseComponent } from './task/add-phase/add-phase.component';
import { EditPhaseComponent } from './task/edit-phase/edit-phase.component';
import { DeletePhaseComponent } from './task/delete-phase/delete-phase.component';
import { ListTypeTaskComponent } from './task/tabs/list-type-task/list-type-task.component';
import { AddTypeTaskComponent } from './task/tabs/add-type-task/add-type-task.component';
import { EditTypeTaskComponent } from './task/tabs/edit-type-task/edit-type-task.component';
import { ListPriorityTaskComponent } from './task/tabs/list-priority-task/list-priority-task.component';
import { AddPriorityTaskComponent } from './task/tabs/add-priority-task/add-priority-task.component';
import { EditPriorityTaskComponent } from './task/tabs/edit-priority-task/edit-priority-task.component';
import { DeleteComponent } from 'src/app/project/delete/delete.component';
import { LazyLoadScriptService } from '../services/lazy-load-script.service';
import { AddTicketComponent } from './ticket/add-ticket/add-ticket.component';
import { EditTicketComponent } from './ticket/edit-ticket/edit-ticket.component';
@NgModule({
  declarations: [ListProjectComponent,
    AddProjectComponent,DeleteProjectComponent ,EditPeojectComponent, ListTaskComponent, ListTicketComponent,
     ViewProjectComponent, AddTypeProjectComponent, EditTypeProjectComponent, DeleteTypeProjectComponent, 
     AddTaskComponent, EditTaskComponent, DragtestComponent, AddPhaseComponent, EditPhaseComponent, DeleteComponent,
      DeletePhaseComponent, ListTypeTaskComponent, AddTypeTaskComponent, EditTypeTaskComponent,ListPriorityTaskComponent, 
      AddPriorityTaskComponent,EditPriorityTaskComponent, AddTicketComponent, EditTicketComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,SharedmModule,DragDropModule
  ],
  providers: [LazyLoadScriptService]
})
export class ProjectModule { }
