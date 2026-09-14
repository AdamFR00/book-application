import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { environment } from '../../../environments/environment';
import { faPlus, faPen, faX} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FontAwesomeModule, RouterLink],
  selector: 'app-books',
  styleUrl: './books.css',
  templateUrl: './books.html',
})
export class Books implements OnInit{
  // Icons
  faPlus = faPlus;
  faPen = faPen;
  faX = faX;
  private http = inject(HttpClient);

  books = signal<Book[]>([]);

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.http.get<Book[]>(`${environment.apiUrl}/books`, {withCredentials: true}).subscribe(
      {
        next: (books) => {
          console.log("Api books: ", books);
          this.books.set(books);
          console.log("Retrieved successfully! ", this.books());
        },
        error: (error) => {
          console.log(`Something went wrong, error: ${error}`);
        }
      });
  }

  updateBook(){

  }
  removeBook(bookId: number){
    this.http.delete(`${environment.apiUrl}/books/${bookId}`, {withCredentials: true}).subscribe(
      {next: () => {
        this.books.update(books => books.filter(book => book.bookId != bookId));
        console.log(`Removed book with id ${bookId} from the backend.`);
      },
      error: (error) => {
        alert("Failed to remove book, please try again.");
        console.log(error);
      }
    });
  }
}
