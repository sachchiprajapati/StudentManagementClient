import { Component, OnInit } from '@angular/core';
import { Userlogin } from '../../models/userlogin';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-mastertheme',
  templateUrl: './mastertheme.component.html',
  styleUrls: ['./mastertheme.component.css']
})
export class MasterthemeComponent implements OnInit {
  user!: Userlogin;

  constructor(private athenticationService: AuthenticationService) {
    this.athenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }
}
