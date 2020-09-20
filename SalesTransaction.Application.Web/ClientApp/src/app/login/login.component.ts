import { LoginService } from './login.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvLogin } from './login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginForm: FormGroup;
  errorMessage: any;
  errorMessageType: any = {
    invForm: 'Invalid Form!',
    invLogin: 'Invalid UserName or Password!'
  };
  loginFormErrors: any = {
    userName: {},
    password: {}
  };

  login: MvLogin = <MvLogin>{};

  constructor(public fb: FormBuilder, public ls: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit() {

    /*, CustomValidationService.passwordValidator*/
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
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

    this.errorMessage = null;
    if (this.loginForm.valid) {

      // const json = this.loginForm.value;
      this.login.userName = this.loginForm.get('userName').value.trim();
      this.login.password = this.loginForm.get('password').value.trim();

      this.ls.getLogin(this.login).subscribe((response: any) => {

        if (response) {

          this.openSnackBar('Login Success!', 'success');
          this.router.navigate(['/user-detail']);
        } else {

          this.errorMessage = this.errorMessageType.invLogin;
        }
      });
    } else {

      this.errorMessage = this.errorMessageType.invForm;
    }
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, 'close', {
      duration: 5000, // in milli-seconds
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
