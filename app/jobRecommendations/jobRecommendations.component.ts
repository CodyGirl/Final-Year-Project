import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { AuthService, twitterId, UserToken } from '../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient } from '@angular/common/http' 
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobRecommendations',
  templateUrl: './jobRecommendations.component.html',
  styleUrls: ['./jobRecommendations.component.scss']
})
export class JobRecommendationsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  heading : string = "Top Job recommmendations for you!"
  
  template: string =
    `<img class="custom-spinner-template" src="assets/img/loader2.gif">`

  title = 'Job Recommendations';
  credentials: twitterId = {
    id: ''
  }
  credentials2: UserToken = {
    token: ''
  }
  columnDefs = [
    {  
      headerName: "Job Title",
      field: "title",
      width: 100
    },
    {  
      headerName: "Description",
      field: "description",
      width: 430
    },
    {  
      headerName: "Job Availability",
      field: "url",
      width: 230
    }
  ];
  rowData: any;
  token: string;
  constructor(public dialog: MatDialog, private _authService: AuthService, private http: HttpClient, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
  }
  
  ngOnInit() {
    this.credentials2.token = this._authService.getToken()
    this.ng4LoadingSpinnerService.show();
     this._authService.Job(this.credentials2).subscribe((persons) => {
      this.ng4LoadingSpinnerService.hide();
       console.log(persons)
      this.rowData = persons;       
     },
     err => {
       
      this.ng4LoadingSpinnerService.hide();
      this.openServerDialog();
      // window.alert("Something really went wrong !");
     });
  }
  
  getJobTableData() {
    this.ng4LoadingSpinnerService.show();
    this._authService.postJobTwitterID(this.credentials).subscribe((persons) => {
      if(persons.result === 'false') {
        //window.alert("Please enter valid twitter id")
        this.ng4LoadingSpinnerService.hide();        
        this.openTwitterDialog();
      }
      else {    
  
        this.ng4LoadingSpinnerService.hide();
        this.rowData = persons;
        this.heading = "Top Job recommendations for "+ this.credentials.id;
      }
    },
    err => {
      
      this.ng4LoadingSpinnerService.hide();
       this.openServerDialog();
      
    });
  }
  openServerDialog(): void {
    const dialogRef = this.dialog.open(JobAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTwitterDialog(): void {
    const dialogRef = this.dialog.open(JobTwitterAlert,{
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
export class JobAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<JobAlert>, private myRoute: Router) {
      this.serverError = "We are sorry. Server is down..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["job"]);
    this.dialogRef.close();
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./popup.component.scss']
})
export class JobTwitterAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<JobTwitterAlert>, private myRoute: Router) {
      this.serverError = "Please enter valid twitter Id..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["job"]);
    this.dialogRef.close();
  }
  

}