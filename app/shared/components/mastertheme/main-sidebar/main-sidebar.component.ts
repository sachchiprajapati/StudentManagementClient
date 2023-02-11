import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { APIVersionModel } from '../../../models/apiVersionModel';
import { Userlogin } from '../../../models/userlogin';
import { UserRoles } from '../../../models/userRoles';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {
  public menu: RouteInfo[] = [];
  public currentUser!: Userlogin;
  public baseUrl = environment.baseUrl;

  constructor(private athenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.athenticationService.userValue;

    this.menu = SIDEBARMENU.filter(f => f.role.includes(this.currentUser.UserType.toLowerCase()));
    this.menu.forEach(f => {
      f.children = this.filterSubmenues(f);
    });
  }

  filterSubmenues(route: RouteInfo) {
    if (route.children && route.children.length) {
      const subMenu = route.children.filter(f => f.role.includes(this.currentUser.UserType.toLowerCase()));
      if (subMenu.length) {
        return subMenu;
      }
      return [];
    }
    return [];
  }
}


export class RouteInfo {
  public name!: string;
  public iconClasses!: string;
  public path!: string[];
  public role!: string[];
  public children!: RouteInfo[];
}

export const SIDEBARMENU: RouteInfo[] = [
  {
    name: 'Dashboard',
    iconClasses: 'fas fa-tachometer-alt',
    path: ['/'],
    role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher, UserRoles.Student],
    children: []
  },
  {
    name: 'Student',
    iconClasses: 'fas fa-users',
    children: [
      {
        name: 'Add Student',
        iconClasses: 'fas fa-user-plus',
        path: ['/addstudent'],
        role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher],
        children: []
      },
      {
        name: 'Students List',
        iconClasses: 'fas fa-table',
        path: ['/studentlist'],
        role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher],
        children: []
      }
    ],
    path: [],
    role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher]
  },
  {
    name: 'Teacher',
    iconClasses: 'fas fa-users',
    children: [
      {
        name: 'Add Teacher',
        iconClasses: 'fas fa-user-plus',
        path: ['/addteacher'],
        role: [UserRoles.Admin, UserRoles.Principal],
        children: []
      },
      {
        name: 'Teacher List',
        iconClasses: 'fas fa-table',
        path: ['/teacherlist'],
        role: [UserRoles.Admin, UserRoles.Principal],
        children: []
      }
    ],
    path: [],
    role: [UserRoles.Admin, UserRoles.Principal]
  },
  {
    name: 'Dev Extreme',
    iconClasses: 'nav-icon fas fa-th',
    children: [
      {
        name: 'Grid',
        iconClasses: 'fas fa-table',
        path: ['/grid'],
        role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher],
        children: []
      },
      {
        name: 'Charts',
        iconClasses: 'fas fa-chart-bar',
        path: ['/barchart'],
        role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher],
        children: []
      }
    ],
    path: [],
    role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher]
  },
  {
    name: 'Material Controls',
    iconClasses: 'fas fa-tree',
    path: ['/matcontrols'],
    role: [UserRoles.Admin, UserRoles.Principal, UserRoles.Teacher, UserRoles.Student],
    children: []
  }
];
