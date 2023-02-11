import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { openCloseAnimation, rotateAnimation } from './menu-item.animations';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css'],
  animations: [openCloseAnimation, rotateAnimation]
})
export class MenuItemsComponent implements OnInit {
  @Input() menuItem: any = null;
  public isExpandable: boolean = false;
  @HostBinding('class.nav-item') isNavItem: boolean = true;
  @HostBinding('class.menu-open') isMenuExtended: boolean = false;
  public isMainActive: boolean = false;
  public isOneOfChildrenActive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (
      this.menuItem &&
      this.menuItem.children &&
      this.menuItem.children.length > 0
    ) {
      this.isExpandable = true;
    }
    this.calculateIsActive(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.calculateIsActive(event.url);
        }
      });
  }

  public handleMainMenuAction() {
    if (this.isExpandable) {
      this.toggleMenu();
      return;
    }
    this.router.navigate(this.menuItem.path);
  }

  public toggleMenu() {
    this.isMenuExtended = !this.isMenuExtended;
  }

  public calculateIsActive(url: string) {
    this.isMainActive = false;
    this.isOneOfChildrenActive = false;
    if (this.isExpandable) {
      this.menuItem.children.forEach((item: { path: string[]; }) => {
        if (item.path[0] === url) {
          this.isOneOfChildrenActive = true;
          this.isMenuExtended = true;
        }
      });
    } else if (this.menuItem.path[0] === url) {
      this.isMainActive = true;
    }
    if (!this.isMainActive && !this.isOneOfChildrenActive) {
      this.isMenuExtended = false;
    }
  }
}
