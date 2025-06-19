import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.minLength(6), Validators.required]
    })
  })

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log("enteredEmail: ", enteredEmail);
  }

  onReset() {
    this.form.reset();
  }

}
