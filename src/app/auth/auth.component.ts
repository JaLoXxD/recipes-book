import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = null;
  authForm: FormGroup;

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) return;
    this.isLoading = true;
    const { email, password } = this.authForm.value;
    let authObservable: Observable<AuthResponseData>;
    if (!this.isLoginMode) {
      authObservable = this._authService.register(email, password);
    } else {
      authObservable = this._authService.login(email, password);
    }
    authObservable.subscribe(
      (resp) => {
        console.log(resp);
      },
      (errMsg) => {
        console.log(errMsg);
        this.error = errMsg;
        this.isLoading = false;
      },
      () => {
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }
    );
    this.authForm.reset();
  }

  onCloseModal() {
    this.error = null;
  }
}
