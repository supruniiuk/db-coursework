import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      console.log('Form: ', this.form);
      const formData = { ...this.form.value };

      console.log('Form Data:', formData);
      if (location.pathname == '/login') this.login();
    } else if (location.pathname == '/registration') {
      this.registration();
    }
  }

  login() {
    console.log('login');
  }
  registration() {
    console.log('registration');
  }
}
