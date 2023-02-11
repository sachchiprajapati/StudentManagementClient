import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { APIVersionModel } from '../models/apiVersionModel';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public baseUrl = environment.baseUrl;
  hubUrl!: string;
  hubMessage!: BehaviorSubject<string>;
  public message!: string;

  public hubConnection!: signalR.HubConnection

  constructor(private dialog: MatDialog) {
    this.hubUrl = this.baseUrl + 'notify';
  }

  public startConnection = () => {
    try {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      this.hubConnection
        .start()
        .then(() => console.log(`Connection started ... !! Connection Id : ${this.hubConnection.connectionId}`))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  public GetBrodcastData(): BehaviorSubject<string> {
    this.hubConnection.on('BroadcastMessage', (data) => {
      this.hubMessage = data;
      this.message = data;

      var curentVersion = localStorage.getItem('DBVersionAPI');
      var newVersion = data as APIVersionModel;
      if (curentVersion != null && curentVersion != 'undefined') {
        var currentVersionData = JSON.parse(localStorage.getItem('DBVersionAPI')!) as APIVersionModel;
        if (currentVersionData.APIVersion != newVersion.APIVersion) {
          this.openDialogBox(newVersion);
        }
      }
      console.log("New Version : " + JSON.stringify(data));
    });

    return this.hubMessage;
  } 

  openDialogBox(newVersion: APIVersionModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Please refresh the screen for new features !',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.setItem('DBVersionAPI', JSON.stringify(newVersion));
        window.location.reload();
        //this.router.navigate([this.router.url])
      }
    });
  }

  //constructor() {
  //  this.hubUrl = this.baseUrl + 'notify';
  //  this.hubHelloMessage = new BehaviorSubject<string>(null!);
  //}

  //private setSignalrClientMethods(): void {
  //  debugger;
  //  this.connection.on('BroadcastMessage', (message: string) => {
  //    this.hubHelloMessage.next(message);
  //  });
  //}

  //public async initiateSignalrConnection(): Promise<void> {
  //  debugger;
  //  try {
  //    this.connection = new signalR.HubConnectionBuilder()
  //      .withUrl(this.hubUrl)
  //      .configureLogging(signalR.LogLevel.Information)
  //      .withAutomaticReconnect()
  //      .build();

  //    await this.connection.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));

  //    this.setSignalrClientMethods();

  //    console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
  //  }
  //  catch (error) {
  //    console.log(`SignalR connection error: ${error}`);
  //  }
  //}

}
