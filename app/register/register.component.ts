import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  serverError
  constructor(public dialog: MatDialog, private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  credentials: UserInfo = {
    _id: '',
    uname: '',
    email: '',
    twitterID: '',
    gender: '',
    age: '',
    psw: '',
   };

   register() {
    this.auth.register(this.credentials).subscribe(
      (data) => {
        console.log(data)
        if(data.result === 'false'){
          this.openTwitterDialog()
          // window.alert("Please enter valid twitter id")
        }
        else{
          this.auth.sendToken(this.registerForm.value.uname)
          this.router.navigateByUrl('/cardDeck');
        }
      },
      err => {
        this.openDialog()
      });
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      uname: ['', Validators.required],
      twitterID: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get formValidation() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
    this.register();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterAlert,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTwitterDialog(): void {
    const dialogRef = this.dialog.open(TwitterAlert,{
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
export class RegisterAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<RegisterAlert>, private myRoute: Router) {
      this.serverError = "We are sorry. Sever is down...";
    }

  onNoClick(): void {
    this.myRoute.navigate(["register"]);
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
export class TwitterAlert {

  serverError
  constructor(
    public dialogRef: MatDialogRef<TwitterAlert>, private myRoute: Router) {
      this.serverError = "Please enter valid twitter Id";
    }

  onNoClick(): void {
    this.myRoute.navigate(["register"]);
    this.dialogRef.close();
  }
  navigateToLogin():void{
    this.myRoute.navigate(["login"]);
    this.dialogRef.close();
  }

}
