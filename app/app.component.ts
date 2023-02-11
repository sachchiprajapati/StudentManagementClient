import { Component, OnInit } from '@angular/core';
import { SignalrService } from './shared/services/signalr.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hubMessage!: BehaviorSubject<string>;

  constructor(public signalrService: SignalrService) {
  }

  ngOnInit(): void {
    this.signalrService.startConnection();
    this.hubMessage = this.signalrService.GetBrodcastData();
  }

}

