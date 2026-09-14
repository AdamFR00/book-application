import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit, inject, signal} from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../sidebar/sidebar';

@Component({
  imports: [FontAwesomeModule, RouterOutlet, SideBar],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  // Icons
  
  userName = signal<string>("");
  http = inject(HttpClient);
  
  ngOnInit() : void {
    this.http.get<User>(`${environment.apiUrl}/auth/me`, {
      withCredentials: true
    }).subscribe({
      next:(user)=>{
            this.userName.set(user.userName);
          },
          error: error => {
            if(error.status == 401) {
              console.log("Did not find user.")
            }
          }
    })
  }
}
