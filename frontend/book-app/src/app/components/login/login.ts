import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);


  
  loginForm: FormGroup = new FormGroup({
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
  
  onLogin(){
    if(this.loginForm.valid) {
      this.http.post(
        `${environment.apiUrl}/auth/login-user`,
         this.loginForm.value, 
         {withCredentials: true,
          responseType: 'text'
         }).subscribe({
          next:(result)=>{
            console.log(result)
            this.router.navigate(['/home']) 
          },
          error: error => {
            if(error.status == 401) {
              alert("Wrong username or password.")
            }
          }
         }
      );
      return true;
    }else{
      return false;
    }
  }

  get userName(){
    return this.loginForm.get('UserName')
  }

  get password(){
    return this.loginForm.get('Password')
  }
}
