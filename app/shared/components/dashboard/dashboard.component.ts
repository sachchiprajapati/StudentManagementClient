import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dashboardData!: any;
  public apiversionData!: any;

  constructor(private activatedRoute: ActivatedRoute, public signalrService: SignalrService) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((response: any) => {
      this.dashboardData = response.dashboardData;
      //this.apiversionData = response.versionData;
      //console.log(this.apiversionData);
    });
    //alert(this.signalrService.hubMessage);
    localStorage.setItem('APIVersion', JSON.stringify(this.signalrService.message));

  }
}
