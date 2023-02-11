import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Userlogin } from '../../../models/userlogin';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  public currentUser!: Userlogin;
  public baseUrl = environment.baseUrl;

  constructor(private router: Router, private athenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUser = this.athenticationService.userValue;
  }

  logout(): void {
    this.athenticationService.logout();
    this.router.navigate(['/login']);
  }
}
