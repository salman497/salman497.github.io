import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) { 
    
  }

   signInWithGoogle() {
     this.authService.signInWithGoogle();
  }

}
