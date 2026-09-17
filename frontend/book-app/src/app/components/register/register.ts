import { Component, inject, signal} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  usernameError = signal<string | null>(null);
  registrationSuccessfull = signal<Boolean>(false);

  private http = inject(HttpClient);
  private router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    UserName: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }
  ),
    Password: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }
    ),
  });
  
  onRegister(){
    this.http.post(
      `${environment.apiUrl}/auth/register-user`,
       this.registerForm.value, 
       {withCredentials: true,
        responseType: 'text'
       }).subscribe({
        next:(result)=>{
          console.log(result)
          this.registrationSuccessfull.set(true);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          console.log(error);
          if(error.status == 400) {
            this.usernameError.set(error.error);
          }
        }
       });
  }

  get userName(){
    return this.registerForm.get('UserName')
  }

  get password(){
    return this.registerForm.get('Password')
  }
}
