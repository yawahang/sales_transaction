import { MvUserDetail } from './../user-detail/user-detail.model';
import { LoginService } from './login.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvLogin } from './login.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginForm: FormGroup;
  errorMessage: any;
  errorMessageType: any = {
    invForm: 'Invalid form!',
    invLogin: 'Unable to login. Try again later!'
  };
  loginFormErrors: any = {
    userName: {},
    password: {}
  };

  login: MvLogin = <MvLogin>{};
  userDetail: MvUserDetail;

  constructor(public fb: FormBuilder, public ls: LoginService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required /*, CustomValidationService.passwordValidator*/]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormChange();
    });
  }

  onLoginFormChange() {

    for (const field in this.loginFormErrors) {

      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      this.loginFormErrors[field] = {};
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  submitForm() { // call server/api and authenticate

    if (this.loginForm.valid) {

      // const json = this.loginForm.value;
      this.login.userName = this.loginForm.get('userName').value;
      this.login.password = this.loginForm.get('password').value;

      this.ls.getLogin(this.login).subscribe((response: any) => {

        if (response) {

          this.userDetail = response;
          this.openSnackBar('Login Success!', 'success');
        } else {

          this.userDetail = null;
          this.errorMessage = this.errorMessageType.invLogin;
        }
      });
    } else {

      this.errorMessage = this.errorMessageType.invForm;
    }
  }

  openSnackBar(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 2000, // in milli-seconds
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  ngAfterViewInit() {

    this.loginForm.updateValueAndValidity();
  }

  ngOnDestroy() {

  }
}
