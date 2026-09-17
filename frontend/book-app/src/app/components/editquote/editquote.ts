import { Component, inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { Quote } from "../../models/quote";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-editquote",
  styleUrl: "./editquote.css",
  templateUrl: "./editquote.html",
})
export class EditQuote {
  private http = inject(HttpClient);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  quoteId!: number;

  ngOnInit() {
    this.quoteId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if (Number.isNaN(this.quoteId)) {
      this.router.navigate(["/home/quotes"]);
      return;
    }
    this.getQuote(this.quoteId);
  }
  quoteForm: FormGroup = new FormGroup({
    Content: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  getQuote(id: number) {
    this.http.get<Quote>(`${environment.apiUrl}/quotes/${id}`).subscribe({
      next: (quote) => {
        this.quoteForm.patchValue({
          Content: quote.content,
        });
      },
    });
  }

  updateQuote(id: number) {
    this.http
      .put(`${environment.apiUrl}/quotes/${id}`, this.quoteForm.value, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          console.log("Quote updated");
          this.router.navigate(["/home/quotes"]);
        },
      });
  }
}
