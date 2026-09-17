import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { Router, RouterLink } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  selector: "app-createbook",
  styleUrl: "./createbook.css",
  templateUrl: "./createbook.html",
})
export class CreateBook {
  private http = inject(HttpClient);
  private router = inject(Router);
  faArrowLeft = faArrowLeft;
  bookForm: FormGroup = new FormGroup({
    Title: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    Author: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    YearPublished: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });

  createBook() {
    this.http
      .post(`${environment.apiUrl}/books`, this.bookForm.value)
      .subscribe({
        next: (response) => {
          console.log("Created book!", response);
          this.router.navigate(["/home/books"]);
        },
        error: (error) => {
          alert(`Failed to create book.`);
          console.log("Book creation failed due to: ", error);
          this.router.navigate(["/home/books"]);
        },
      });
  }
}
