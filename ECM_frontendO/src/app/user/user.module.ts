import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EmployeeComponent } from './employee/list-employee/employee.component';
import { ClientComponent } from './client/list-client/client.component';
import { SharedmModule } from '../sharedm/sharedm.module';
import { AdministratorComponent } from './administrator/list-administrator/administrator.component';
import { AddAdministratorComponent } from './administrator/add-administrator/add-administrator.component';
import { EditAdministratorComponent } from './administrator/edit-administrator/edit-administrator.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { ProfileAdministratorComponent } from './administrator/profile-administrator/profile-administrator.component';
import { DeleteRoleComponent } from './role/delete-role/delete-role.component';

import { TakeImageComponent } from './images/take-image/take-image.component';
import { AddImageComponent } from './images/add-image/add-image.component';
import { WebcamModule } from 'ngx-webcam';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FileSaverModule } from 'ngx-filesaver';
import { ProgressComponent } from './images/progress/progress.component';
import { GalleryModule } from '@ks89/angular-modal-gallery'; // 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, ModalModule, WavesModule,ButtonsModule } from 'angular-bootstrap-md';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { DeleteDepartmentComponent } from './department/delete-department/delete-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { AddSocietyComponent } from './society/add-society/add-society.component';
import { DeleteSocietyComponent } from './society/delete-society/delete-society.component';
import { ListSocietyComponent } from './society/list-society/list-society.component';
import { ViewSocietyComponent } from './society/view-society/view-society.component';
import { EditSocietyComponent } from './society/edit-society/edit-society.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { DeleteComponent } from './delete/delete.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ProfileEmployeeComponent } from './employee/profile-employee/profile-employee.component';
@NgModule({
  declarations: [
    
    AdministratorComponent, AddAdministratorComponent,EditAdministratorComponent,
    ClientComponent,AddClientComponent,
    EmployeeComponent,AddEmployeeComponent,
    ListRoleComponent, AddRoleComponent, EditRoleComponent, ViewRoleComponent,ProgressComponent ,
     ProfileAdministratorComponent, DeleteRoleComponent, AddImageComponent,TakeImageComponent, AddDepartmentComponent, DeleteDepartmentComponent, EditDepartmentComponent, ViewDepartmentComponent, AddSocietyComponent, DeleteSocietyComponent, ListSocietyComponent, ViewSocietyComponent, EditSocietyComponent, ListDepartmentComponent, SafehtmlPipe, DeleteComponent, EditClientComponent, ProfileClientComponent, EditEmployeeComponent, ProfileEmployeeComponent],
  imports: [
    CommonModule,FileSaverModule, GalleryModule.forRoot() ,MDBBootstrapModule, CarouselModule, ModalModule, WavesModule,ButtonsModule ,
    UserRoutingModule, SharedmModule,WebcamModule,FlexLayoutModule
  ]
})
export class UserModule { }
