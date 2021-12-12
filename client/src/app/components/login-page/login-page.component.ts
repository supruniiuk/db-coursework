import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      if (location.pathname == '/login'){
        this.login(formData);
      }
    } else if (location.pathname == '/registration') {
      this.registration();
    }
  }

  login(authData: User) {
    this.auth.login(authData);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/'])
  }

  registration() {
    console.log('registration');
  }
}
