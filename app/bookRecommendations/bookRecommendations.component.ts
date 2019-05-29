import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { AuthService, twitterId, UserToken } from '../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient } from '@angular/common/http'
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookRecommendations',
  templateUrl: './bookRecommendations.component.html',
  styleUrls: ['./bookRecommendations.component.scss']
})
export class BookRecommendationsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  heading : string = "Top Book recommmendations for you!"
  
  template: string =
    `<img class="custom-spinner-template" src="assets/img/loader2.gif">`

  title = 'Book Recommendations';
  credentials: twitterId = {
    id: ''
  }
  credentials2: UserToken = {
    token: ''
  }
  columnDefs = [
    {
      headerName: "Thumbnail",
      field: "thumbnail",
      width: 200
    },
    {
      headerName: "Title",
      field: "title",
      width: 300
    },
    {
      headerName: "Author",
      field: "author",
      width: 300
    },
    {
      headerName: "Publisher",
      field: "publisher",
      width: 200
    }
  ];
  rowData: any;
  token: string;
  constructor(public dialog: MatDialog, private _authService: AuthService, private http: HttpClient, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
  }
  
  ngOnInit() {
    this.credentials2.token = this._authService.getToken();
    this.ng4LoadingSpinnerService.show();
     this._authService.Books(this.credentials2).subscribe((persons) => {
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
  
  getBookTableData() {
    this.ng4LoadingSpinnerService.show();
    this._authService.postBookTwitterID(this.credentials).subscribe((persons) => {
      if(persons.result === 'false') {
        this.ng4LoadingSpinnerService.hide();
        this.openTwitterDialog();
        // window.alert("Please enter valid twitter id")
        
      }
      else {      
        this.ng4LoadingSpinnerService.hide();
        this.rowData = persons;
        this.heading = "Top Book recommendations for "+ this.credentials.id;
      }
    },
    err => {
      this.ng4LoadingSpinnerService.hide();
      this.openServerDialog();
      // window.alert("Something really went wrong !");
    });
  }

  openServerDialog(): void {
    const dialogRef = this.dialog.open(BookAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTwitterDialog(): void {
    const dialogRef = this.dialog.open(BookTwitterAlert,{
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
export class BookAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<BookAlert>, private myRoute: Router) {
      this.serverError = "We are sorry. Server is down..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["book"]);
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
export class BookTwitterAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<BookTwitterAlert>, private myRoute: Router) {
      this.serverError = "Please enter valid twitter Id..."
    }

  onNoClick(): void {
    this.myRoute.navigate(["book"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}