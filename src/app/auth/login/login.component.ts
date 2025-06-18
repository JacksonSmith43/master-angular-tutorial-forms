import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.minLength(6), Validators.required]
    })
  });

  get emailIsInvalid() {
    return this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty;
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredpssword = this.form.value.password;

    console.log("enteredEmail: ", enteredEmail);
    console.log("enteredpssword: ", enteredpssword);
  }

}