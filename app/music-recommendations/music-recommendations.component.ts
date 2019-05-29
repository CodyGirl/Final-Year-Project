import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { AuthService, twitterId, UserToken } from '../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient } from '@angular/common/http'
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-music-recommendations',
  templateUrl: './music-recommendations.component.html',
  styleUrls: ['./music-recommendations.component.scss']
})
export class MusicRecommendationsComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  heading : string = "Top music recommmendations for you!"
  title = 'Music Recommendations';
  
  template: string =
    `<img class="custom-spinner-template" src="assets/img/loader2.gif">`

  credentials: twitterId = {
    id: ''
  }
  credentials2: UserToken = {
    token: ''
  }
  columnDefs = [
    {
      headerName: "Title",
      field: "title",
      width: 230
    },
    {
      headerName: "Genre",
      field: "genre",
      width: 230
    },
    {
      headerName: "URL",
      field: "url",
      width: 200
    }
  ];
  rowData: any;
  token: string;
  constructor(public dialog: MatDialog, private _authService: AuthService, private http: HttpClient, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
  }
  
  ngOnInit() {
    this.credentials2.token = this._authService.getToken()
    this.ng4LoadingSpinnerService.show();
     this._authService.Music(this.credentials2).subscribe((persons) => {
      this.ng4LoadingSpinnerService.hide();
       console.log(persons)
      this.rowData = persons;       
     },
     err => {
      //window.alert("Something really went wrong !");
        this.ng4LoadingSpinnerService.hide();        
        this.openServerDialog();  
     });
  }
  
  getMusicTableData() {
    this.ng4LoadingSpinnerService.show();
    this._authService.postMusicTwitterID(this.credentials).subscribe((persons) => {
      if(persons.result === 'false') {
        //window.alert("Please enter valid twitter id")
              
        this.ng4LoadingSpinnerService.hide();        
        this.openTwitterDialog();
      }
      else {      
        this.ng4LoadingSpinnerService.hide();
        this.rowData = persons;
        this.heading = "Top music recommendation for "+ this.credentials.id;
      }
    },
    err => {
      //window.alert("Something really went wrong !");
      this.ng4LoadingSpinnerService.hide();        
      this.openServerDialog();
    });
  }
  openServerDialog(): void {
    const dialogRef = this.dialog.open(MusicAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTwitterDialog(): void {
    const dialogRef = this.dialog.open(MusicTwitterAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./popup.component.scss']
})
export class MusicAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<MusicAlert>, private myRoute: Router) {
      this.serverError = "We are sorry. Server is down..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["music"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./popup.component.scss']
})
export class MusicTwitterAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<MusicTwitterAlert>, private myRoute: Router) {
      this.serverError = "Please enter valid twitter Id..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["music"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }
}