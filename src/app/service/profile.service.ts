import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';
import { ProfileUserModel } from '../model/profile.user.model'

@Injectable({
    providedIn: 'root'
})
export class ProfileService{

    private urlGetUser="http://localhost:9090/suivi-financier-auth/getUser/"+localStorage.getItem("email");
 
    constructor(private http:HttpClient){
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }

    getUser() : Observable<ProfileUserModel> {
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

    updateEmail(newEmail:string, oldEmail:string): Observable<any> {
        var urlUpdateEmail="http://localhost:9090/suivi-financier-auth/updateEmail?newEmail="+newEmail+"&oldEmail="+oldEmail+"&userId="+localStorage.getItem('userId');
        //On change le event en JSON
        const body = "";
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');

        return this.http.post<string>(urlUpdateEmail,body,{headers})
        .pipe(              
        map((response:any) => {
            return response;
        }),
            tap((response) => {
                //console.log(response);
            }),
            catchError(this.handleError)
        );
    }
   

}