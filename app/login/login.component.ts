import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../auth.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  result: any;
  invaliduname: any = '';
  invalidpwd: any = '';
  constructor(public dialog: MatDialog, private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  credentials: UserInfo = {
    _id: '',
    uname: '',
    email: '',
    twitterID: '',
    gender: '',
    age: '',
    psw: ''
  }

  ngOnInit() {
    
    if(this.auth.isLoggednIn()) {
      this.router.navigateByUrl('/')  
    } else {
      this.loginForm = this.formBuilder.group({
        uname: ['', Validators.required],
        password: ['', Validators.required]
      },
      err => {
        // window.alert("Something really went wrong !");
        this.openDialog();
      });  
    }
  }

  get formValidation() { return this.loginForm.controls; }

  onSubmit() {
    this.invalidpwd = "";
    this.invaliduname = "";
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {

      this.auth.login(this.credentials).subscribe(
        (data) => {
          console.log(data)
          if (data.result === 'correct') {
            this.auth.sendToken(this.loginForm.value.uname)
            this.router.navigateByUrl('/cardDeck')  
          
          } else if (data.result === 'wrong') {
            this.invalidpwd = ("Please enter correct password")
          }
          else {
            this.invaliduname = ("Username not exist")
          }
        },
        err => {
          // window.alert("Something really went wrong !");
          this.openDialog();
        }
      )
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginAlert,{
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
export class LoginAlert {

  constructor(
    public dialogRef: MatDialogRef<LoginAlert>, private myRoute: Router) {}

  onNoClick(): void {
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}