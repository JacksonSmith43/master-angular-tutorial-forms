import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) { // This checks if two form controls have the same value. 

  return (control: AbstractControl) => { // control: AbstractControl is the parent form group that contains the two controls. This syntax is used to create a custom validator function.

    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null; // No validation error, values are equal. 
    }
    return { valuesNotEqual: true };
  }
}

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

    passwords: new FormGroup({
      password: new FormControl("", {
        validators: [Validators.minLength(6), Validators.required]
      }),
      confirmPassword: new FormControl("", {
        validators: [Validators.minLength(6), Validators.required]
      }),

    }, {
      validators: [equalValues("password", "confirmPassword")]
    }),

    firstName: new FormControl("", { validators: [Validators.required] }),
    lastName: new FormControl("", { validators: [Validators.required] }),

    address: new FormGroup({
      street: new FormControl("", { validators: [Validators.required] }),
      number: new FormControl("", { validators: [Validators.required] }),
      postCode: new FormControl("", { validators: [Validators.required] }),
      city: new FormControl("", { validators: [Validators.required] }),
    }),

    role: new FormControl<"student" | "teacher" | "employee" | "founder" | "other">("student", { validators: [Validators.required] }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    agree: new FormControl(false, { validators: [Validators.required] })
  })

  onSubmit() {
    if (this.form.invalid) {
      console.log("Invalid form.");
      return;
    }
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }

}
