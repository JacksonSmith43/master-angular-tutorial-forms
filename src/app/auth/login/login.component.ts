import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredpssword = this.form.value.password;

    console.log("enteredEmail: ", enteredEmail);
    console.log("enteredpssword: ", enteredpssword);
  }

}