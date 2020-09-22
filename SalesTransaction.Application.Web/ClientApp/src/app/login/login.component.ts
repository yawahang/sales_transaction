import { UtilityService } from './../../core/services/utility.service';
import { LoginService } from './login.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvLogin } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginForm: FormGroup;
  errorMessage: any;
  login: MvLogin = <MvLogin>{};

  constructor(
    public fb: FormBuilder,
    public ls: LoginService,
    private us: UtilityService,
    private router: Router
  ) {

  }

  ngOnInit() {

    /*[Validators.required, CustomValidationService.passwordValidator]*/
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() { // call server/api and authenticate

    this.errorMessage = '';
    if (this.loginForm.valid) {

      // const json = this.loginForm.value;
      this.login.userName = this.loginForm.get('userName').value.trim();
      this.login.password = this.loginForm.get('password').value.trim();

      this.ls.getLogin(this.login).subscribe((response: any) => {

        if (response) {

          this.us.openSnackBar('Login Success!', 'success');
          this.router.navigate(['/user-detail']);
        } else {

          this.errorMessage = 'Invalid UserName or Password!';
        }
      });
    } else {

      this.errorMessage = 'Invalid Form!';
    }
  }

  ngAfterViewInit() {

    this.loginForm.updateValueAndValidity();
  }

  ngOnDestroy() {

  }
}
