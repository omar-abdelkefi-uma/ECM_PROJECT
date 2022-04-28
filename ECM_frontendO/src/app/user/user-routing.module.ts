import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client/list-client/client.component';
import { EmployeeComponent } from './employee/list-employee/employee.component';
import { AdministratorComponent } from './administrator/list-administrator/administrator.component';
import { AddAdministratorComponent } from './administrator/add-administrator/add-administrator.component';
import { EditAdministratorComponent } from './administrator/edit-administrator/edit-administrator.component';
import { ProfileAdministratorComponent } from './administrator/profile-administrator/profile-administrator.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { AddImageComponent } from './images/add-image/add-image.component';
import { ListSocietyComponent } from './society/list-society/list-society.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ProfileEmployeeComponent } from './employee/profile-employee/profile-employee.component';

const routes: Routes = [
  { path: 'addimage/:id', component: AddImageComponent },
  /***********administrator */
  { path: 'administrator', component: AdministratorComponent  },
  { path: 'addadministrator', component: AddAdministratorComponent  },
  { path: 'editadministrator/:id', component: EditAdministratorComponent  },
  { path: 'profileadministrator/:id', component: ProfileAdministratorComponent   },
  //******client */
  { path: 'client', component: ClientComponent  },
  { path: 'addclient', component: AddClientComponent },
  { path: 'editclient/:id', component: EditClientComponent  },
  { path: 'profileclient/:id', component: ProfileClientComponent   },
  
  /**********employee */
  { path: 'employee', component: EmployeeComponent  },
  { path: 'addemployee', component: AddEmployeeComponent},
  { path: 'editemployee/:id', component: EditEmployeeComponent  },
  { path: 'profileemployee/:id', component: ProfileEmployeeComponent   },
  /***role */
  { path: 'addrole', component: AddRoleComponent },
  { path: 'listrole', component: ListRoleComponent },
  { path: 'editrole/:id', component: EditRoleComponent },
  /***component and department */
  { path: 'company', component: ListSocietyComponent  },
  { path: 'department', component: ListDepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
