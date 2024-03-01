import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../core/store/app.reducer';
import { Router } from '@angular/router';
import { LOGIN } from '../../../../core/store/actions/session.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  sessionSubscription: Subscription;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(true),
  });

  constructor(public store: Store<AppState>, private router: Router) {
    const REMEMBER = localStorage.getItem('username');
    if (REMEMBER) {
      this.loginForm.controls['username'].setValue(REMEMBER);
    }
  }

  ngOnInit(): void {
    this.sessionSubscription = this.store
      .select('session')
      .subscribe((session) => {
        if (session.session) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.sessionSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, remember } = this.loginForm.value;

    if (remember) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }

    this.store.dispatch(LOGIN({ username, password }));
  }
}
