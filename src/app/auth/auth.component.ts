import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  submitted = false;
  submitReq = false
  showPassword: Boolean = false;

  form = this.formBuilder.group({
    nik: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService:AlertService
  ) {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.submitReq = true;
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }
    // this.spinner.show()
    this.authService
      .login(this.f['nik'].value, this.f['password'].value)
      .subscribe(
        (data) => {
          this.authService.saveToken(data.token);
          this.authService.saveUser(data.user);

          console.log('Sign In Success');
          // alert('Sign In Success')
          this.router.navigate(['/']);
          
          this.alertService.onCallAlert('Login Successful !', AlertType.Success);
          //this.reloadPage();
        },
        (err) => {
          console.log(err);

          if (err.statusText == 'Unauthorized') {
            console.log('NIK or Pass Invalid');
            
            this.alertService.onCallAlert(
              'NIK or Password Invalid',
              AlertType.Error
            );
          } else {
            this.alertService.onCallAlert('Login Failed', AlertType.Error);
            console.log('Sign In Failed');
          }

          
          this.submitted = false;
          this.submitReq = false;
          this.f['password'].setValue('');
          // this.spinner.hide()
        },
        () => {
          this.submitted = false;
          this.submitReq = false;
          // this.spinner.hide()
        }
      );
  }

  changeVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
