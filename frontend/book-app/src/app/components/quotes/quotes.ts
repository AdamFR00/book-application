import { HttpClient } from "@angular/common/http";
import { Component, inject, signal, OnInit } from "@angular/core";
import { Quote } from "../../models/quote";
import { environment } from "../../../environments/environment";
import {
  faPlus,
  faPen,
  faX,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterLink } from "@angular/router";

@Component({
  imports: [FontAwesomeModule, RouterLink],
  selector: "app-quotes",
  styleUrl: "./quotes.css",
  templateUrl: "./quotes.html",
})
export class Quotes implements OnInit {
  // Icons
  faPlus = faPlus;
  faPen = faPen;
  faX = faX;
  faQuoteLeft = faQuoteLeft;
  faQuoteRight = faQuoteRight;

  private http = inject(HttpClient);
  quotes = signal<Quote[]>([]);

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes() {
    this.http.get<Quote[]>(`${environment.apiUrl}/quotes`).subscribe({
      next: (quotes) => {
        console.log("Api quotes ", quotes);
        this.quotes.set(quotes);
        console.log("Retrieved successfully! ", this.quotes());
      },
      error: (error) => {
        console.log(`Something went wrong, error: ${error}`);
      },
    });
  }

  removeQuote(quoteId: number) {
    this.http.delete(`${environment.apiUrl}/quotes/${quoteId}`).subscribe({
      next: () => {
        this.quotes.update((quotes) =>
          quotes.filter((quote) => quote.quoteId != quoteId),
        );
        console.log(`Removed quote with id ${quoteId} from the backend.`);
      },
      error: (error) => {
        alert("Failed to remove quote, please try again.");
        console.log(error);
      },
    });
  }
}
