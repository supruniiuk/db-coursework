import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserRegistration } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup;
  formRegistration: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('', Validators.required),
    });

    this.formRegistration = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  submit() {
    if (this.formLogin.valid && location.pathname == '/login') {
      const formData = { ...this.formLogin.value };
      this.login(formData);
    } else if (
      this.formRegistration.valid &&
      location.pathname == '/registration'
    ) {
      const formData = { ...this.formRegistration.value };
      this.registration(formData);
    }
  }

  login(authData: UserRegistration) {
    this.auth.login(authData);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/']);
  }

  registration(registrationData: UserRegistration) {
    this.auth.registration(registrationData);
  }

  getLocation() {
    return location.pathname;
  }
}
