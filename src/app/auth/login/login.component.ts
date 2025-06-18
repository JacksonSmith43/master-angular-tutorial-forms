import { afterNextRender, Component, viewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DestroyRef } from '@angular/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>("form");
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => { // This will run after the view is initialised. 
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({ // This will make sure that the valueChanges observable emits only after 500ms of inactivity. 
        next: (value) => window.localStorage.setItem("saved-login-form", JSON.stringify({ email: value.email }) // Saves the email field to localStorage after 500ms of inactivity in an object with the key "saved-login-form".
        )
      });
      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    })
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log("enteredEmail: ", enteredEmail);
    console.log("enteredPassword: ", enteredPassword);
    formData.form.reset();
  }
}
