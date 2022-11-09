import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of, delay, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor(private http:HttpClient) {
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.isLoggedIn = true;
    }
  }

  handleError (error: HttpErrorResponse){
      return throwError(() => error.message);
  }



  login(email:String, password:String): Observable<boolean> {
    var urlLogin:string = "http://localhost:9090/suivi-financier-auth/login";

    //Pour les décoder il faudrait utiliser cette ligne de code ci-dessous
    //var userNameDecode = decodeURIComponent(escape(window.atob(name)));

      
    if(this.isLoggedIn){
      //On sauvegarde le status du login dans les cookies
      localStorage.setItem('isLoggedIn','true');
    }

    var emailParameter:string = "?emailUser="+email;
    var passwordParameter:string = "&password="+password;
    urlLogin = urlLogin + emailParameter + passwordParameter;
    console.log(urlLogin);
    return this.http.post(urlLogin, null).pipe(map(
        (response:any) => {
          return response;
        }
      ),
      tap((response) => {
          //console.log(response.toString());
          this.isLoggedIn = response;
          //On sauvegarde le status du login dans les cookies
          localStorage.setItem('isLoggedIn','true');
      }),
      catchError(this.handleError)
    );
  }

  /*
  //Old test
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
  */

  logout() {
    this.isLoggedIn = false;
    //On supprime le status du login dans les cookies
    localStorage.removeItem('isLoggedIn');
  }

}
