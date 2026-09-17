import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: "app-login",
  styleUrl: "./login.css",
  templateUrl: "./login.html",
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);
  signInError = signal<boolean>(false);
  signInErrorMessage = signal<string | null>(null);

  loginForm: FormGroup = new FormGroup({
    UserName: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onLogin() {
    this.http
      .post(`${environment.apiUrl}/auth/login-user`, this.loginForm.value, {
        responseType: "text",
      })
      .subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          this.signInError.set(true);
          if (error.status == 401) {
            this.signInErrorMessage.set(error.error);
          } else {
            this.signInErrorMessage.set("Something went wrong.");
          }
        },
      });
  }
}
