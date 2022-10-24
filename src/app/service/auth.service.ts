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
    //Pour les décoder il faudrait utiliser cette ligne de code ci-dessous
    //var userNameDecode = decodeURIComponent(escape(window.atob(name)));
    var nameDecode:string = decodeURIComponent(escape(window.atob(name)));
    var passwordDecode:string = decodeURIComponent(escape(window.atob(password)));
    
    const isLoggedIn = (nameDecode == 'admin' && passwordDecode == "C£©!€$ʈ1W0t2P^s$ɘ");
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
