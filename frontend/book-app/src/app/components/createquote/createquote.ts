import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  selector: 'app-createquote',
  styleUrl: './createquote.css',
  templateUrl: './createquote.html',
})
export class CreateQuote {
  private http = inject(HttpClient);
  private router = inject(Router);
  faArrowLeft = faArrowLeft;
  quoteForm: FormGroup = new FormGroup({
      content: new FormControl<string>('', {
        nonNullable: true,
      validators: [Validators.required]
    })
  });

  createQuote() {
    this.http.post(`${environment.apiUrl}/quotes`, this.quoteForm.value, {withCredentials: true})
    .subscribe({
      next: (response) => {
        console.log("Created quote!", response);
        this.router.navigate(['/home/quotes']);
      },
      error: (error) => {
        alert(`Failed to create quote, ${error.error}`);
        console.log("Quote creation failed, ", error.error);
        this.router.navigate(['/home/quotes']);
      }
    })
  }
}
