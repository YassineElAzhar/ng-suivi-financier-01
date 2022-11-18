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



  login(email:String, password:String, emailUtf8:string): Observable<boolean> {
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
          localStorage.setItem('email',emailUtf8);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.isLoggedIn = false;
    //On supprime le status du login dans les cookies
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
  }

}
