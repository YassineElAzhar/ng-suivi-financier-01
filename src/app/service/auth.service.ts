import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor() {
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.isLoggedIn = true;
    }
  }


  
  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == 'admin' && password == 'C£©!€$ʈ1W0t2P^s$ɘ');
    if(isLoggedIn){
      //On sauvegarde le status du login dans les cookies
      localStorage.setItem('isLoggedIn','true');
    }

    return of(isLoggedIn).pipe(
      delay(1000),
      tap( isLoggedIn => this.isLoggedIn = isLoggedIn )
    );
  }

  logout() {
    this.isLoggedIn = false;
    //On supprime le status du login dans les cookies
    localStorage.removeItem('isLoggedIn');
  }

}
