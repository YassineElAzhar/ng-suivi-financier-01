import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';
import { ProfileUserModel } from '../model/profile.user.model'

@Injectable({
    providedIn: 'root'
})
export class ProfileService{

    private urlGetUser="http://localhost:9090/suivi-financier-auth/getUser/";
 
    constructor(private http:HttpClient){
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }


    

    getUser() : Observable<ProfileUserModel> {
        this.urlGetUser = this.urlGetUser+localStorage.getItem("email");
        return this.http.get<ProfileUserModel>(this.urlGetUser)
        .pipe(              
        map((response : ProfileUserModel) => {
            return response;
        }),
            tap((response) => {
               // console.log(response.length.toString());
            }),
            catchError(this.handleError)
        );
    }
   

}