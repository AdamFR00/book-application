import { Component, inject, OnInit, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../../models/book";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-editbook",
  styleUrl: "./editbook.css",
  templateUrl: "./editbook.html",
})
export class EditBook implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  bookId!: number;
  bookUpdateErrorMessage = signal<string | null>(null);

  ngOnInit() {
    this.bookId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if (Number.isNaN(this.bookId)) {
      this.router.navigate(["home/books"]);
      return;
    }
    this.getBook(this.bookId);
  }

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

  updateBook(id: number) {
    this.http
      .put(`${environment.apiUrl}/books/${id}`, this.bookForm.value)
      .subscribe({
        next: () => {
          console.log("Book updated!");
          this.router.navigate(["/home/books"]);
        },
        error: (error) => {
          this.bookUpdateErrorMessage.set(
            `Something went wrong, ${error.error}`,
          );
        },
      });
  }

  getBook(id: number) {
    this.http.get<Book>(`${environment.apiUrl}/books/${id}`).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          Title: book.title,
          Author: book.author,
          YearPublished: book.yearPublished,
        });
      },
    });
  }
}
