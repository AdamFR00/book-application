import { Component, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { Router, RouterLink } from "@angular/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  selector: "app-createquote",
  styleUrl: "./createquote.css",
  templateUrl: "./createquote.html",
})
export class CreateQuote {
  private http = inject(HttpClient);
  private router = inject(Router);
  quoteCreationError = signal<boolean>(false);
  quoteCreationMessage = signal<string | null>(null);
  faArrowLeft = faArrowLeft;
  quoteForm: FormGroup = new FormGroup({
    content: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  createQuote() {
    this.http
      .post(`${environment.apiUrl}/quotes`, this.quoteForm.value)
      .subscribe({
        next: (response) => {
          console.log("Created quote!", response);
          this.router.navigate(["/home/quotes"]);
        },
        error: (error) => {
          this.quoteCreationError.set(true);
          if (error.status == 409) {
            this.quoteCreationMessage.set(
              `${error.error}, remove quotes to add more.`,
            );
          } else {
            this.quoteCreationMessage.set(
              "Something went wrong, please try again",
            );
          }
        },
      });
  }
}
