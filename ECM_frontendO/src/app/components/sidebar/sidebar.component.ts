import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  role: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/alluser/listrole', title: 'Role', icon: 'ni-planet text-blue', class: '', role: 'admin' },
  { path: '/alluser/administrator', title: 'Administrator', icon: 'ni-single-02 text-yellow', class: '', role: 'admin' },
  { path: '/alluser/employee', title: 'Employees', icon: 'ni-single-02 text-red', class: '', role: 'admin' },
  { path: '/alluser/client', title: 'Customers', icon: 'ni-single-02 text-info', class: '', role: 'admin' },
  { path: '/allproject/project', title: 'Project', icon: 'ni-planet text-pink', class: '', role: '' },
  // { path: '/allproject/tasks', title: 'Task',  icon:'ni-planet text-blue', class: '' ,role:''},
  { path: '/allproject/ticket', title: 'Ticket', icon: 'ni-planet text-orange', class: '', role: '' },
  { path: '/alluser/company', title: 'Company', icon: 'ni-building text-red', class: '', role: 'admin' },
  { path: '/alluser/department', title: 'Departments', icon: 'ni-building text-pink', class: '', role: 'admin' },
  { path: '/messages/chat', title: 'Messages', icon: 'ni-chat-round text-orange', class: '', role: '' },
  /* { path: '/tables', title: 'My Calendar',  icon:'ni-calendar-grid-58 text-red', class: '' ,role:''},
   { path: '/login', title: 'Timesheet',  icon:'ni-bullet-list-67 text-info', class: '' },*/
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  user: User;

  constructor(private router: Router, private storageservice: StorageService,) { }

  ngOnInit() {
    this.user = this.storageservice.getuserfromcookieorsession();
    if (this.user.type !== 'admin') {
      this.menuItems = ROUTES.filter(menuItem => menuItem.role !== 'admin');
    }else{
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
