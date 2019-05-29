import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public auth: AuthService) { }
  bgFlag: any=false;
  ngOnInit() {
    if (this.auth.subsVar==undefined) {    
      this.auth.subsVar = this.auth.invokePopupComponentFunction.subscribe((name:string) => {    
        this.openDialog();    
      });    
    }  
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 200) {
      this.bgFlag = true;
      console.log('You are 600px from the top to bottom');
      this.myStyles;
    } else {
      this.bgFlag = false;
      this.myStyles;
    }
  }

  get myStyles() {
    if(this.bgFlag == true) {
      return {
        'background-color' : '#00001a'
      };
    } else {
      return {
        'background-color' : 'transparent'
      };
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog,{
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
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private myRoute: Router) {}

  onNoClick(): void {
    this.myRoute.navigate([""]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}