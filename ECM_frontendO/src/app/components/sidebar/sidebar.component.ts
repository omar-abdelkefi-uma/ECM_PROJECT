import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home/dash', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/alluser/listrole', title: 'Role',  icon:'ni-planet text-blue', class: '' },
    { path: '/alluser/administrator', title: 'Administrator',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/alluser/employee', title: 'Employees',  icon:'ni-single-02 text-red', class: '' },
    { path: '/alluser/client', title: 'Customers',  icon:'ni-single-02 text-info', class: '' },
    { path: '/allproject/project', title: 'Project',  icon:'ni-planet text-pink', class: '' },
   // { path: '/allproject/tasks', title: 'Task',  icon:'ni-planet text-blue', class: '' },
    { path: '/allproject/ticket', title: 'Ticket',  icon:'ni-planet text-orange', class: '' },
    { path: '/icons', title: 'User Profile',  icon:'ni-circle-08  text-blue', class: '' },

    { path: '/messages/chat', title: 'Messages',  icon:'ni-chat-round text-orange', class: '' },
    { path: '/tables', title: 'My Calendar',  icon:'ni-calendar-grid-58 text-red', class: '' },
    { path: '/login', title: 'Timesheet',  icon:'ni-bullet-list-67 text-info', class: '' },
    { path: '/alluser/department', title: 'Departments',  icon:'ni-building text-pink', class: '' },
    { path: '/alluser/company', title: 'Company',  icon:'ni-building text-red', class: '' },
    { path: '/alluser/client', title: 'Chart',  icon:'ni-chart-bar-32 text-info', class: '' },
    { path: '/alluser/client', title: 'Config',  icon:'ni-settings text-info', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
