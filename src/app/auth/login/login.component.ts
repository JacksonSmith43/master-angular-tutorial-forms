import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes("?")) {
    return null; // Null means that the validation passed. 
  }
  return { doesNotContainQuestionMark: true } // Return an object with a key to indicate the validation failed. 
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== "admin@gmail.com") {
    return of(null); // of() creates an observable. This is used for async validation. Observables are used to handle asynchronous operations in Angular.
  }
  return of({ notUnique: true });
}

// The idea is to have the email field pre-filled with the last entered email value when the user returns to the login page. So this will be loaded once the file is first loaded. 
let initialEmailValue = "";
const savedForm = window.localStorage.getItem("saved-login-form");
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl("", {
      validators: [Validators.minLength(6), Validators.required, mustContainQuestionMark]
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

  ngOnInit() {
    // const savedForm = window.localStorage.getItem("saved-login-form");

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({ // Patch value is used to update the form with the loaded values. 
    //     email: loadedForm.email
    //   })

    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem("saved-login-form", JSON.stringify({ email: value.email })
        );
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());

  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredpssword = this.form.value.password;

    console.log("enteredEmail: ", enteredEmail);
    console.log("enteredpssword: ", enteredpssword);
  }

}