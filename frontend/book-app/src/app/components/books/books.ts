import { HttpClient } from "@angular/common/http";
import { Component, inject, signal, OnInit } from "@angular/core";
import { Book } from "../../models/book";
import { environment } from "../../../environments/environment";
import { faPlus, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterLink } from "@angular/router";

@Component({
  imports: [FontAwesomeModule, RouterLink],
  selector: "app-books",
  styleUrl: "./books.css",
  templateUrl: "./books.html",
})
export class Books implements OnInit {
  // Icons
  faPlus = faPlus;
  faPen = faPen;
  faX = faX;
  private http = inject(HttpClient);
  bookRemovalError = signal<string | null>(null);
  bookRetrievalError = signal<string | null>(null);
  books = signal<Book[]>([]);

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Book[]>(`${environment.apiUrl}/books`).subscribe({
      next: (books) => {
        console.log("Api books: ", books);
        this.books.set(books);
        console.log("Retrieved successfully! ", this.books());
      },
      error: (error) => {
        this.bookRetrievalError.set(error.error);
      },
    });
  }

  removeBook(bookId: number) {
    this.http.delete(`${environment.apiUrl}/books/${bookId}`).subscribe({
      next: () => {
        this.books.update((books) =>
          books.filter((book) => book.bookId != bookId),
        );
        console.log(`Removed book with id ${bookId} from the backend.`);
      },
      error: (error) => {
        this.bookRemovalError.set(error.error);
      },
    });
  }
}
