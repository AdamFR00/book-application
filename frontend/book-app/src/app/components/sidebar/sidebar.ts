import { Component } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { inject } from "@angular/core";
import {
  faBars,
  faBook,
  faQuoteLeft,
  faHouse,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class SideBar {
  private http = inject(HttpClient);
  private router = inject(Router);
  faBars = faBars;
  faBook = faBook;
  faQuoteLeft = faQuoteLeft;
  faHouse = faHouse;
  faArrowRight = faArrowRight;

  onLogout() {
    this.http
      .post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(["/login"]);
        },
      });
  }
}
