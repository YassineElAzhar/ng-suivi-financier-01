import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { IncomesModel } from '../model/incomes.model'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IncomesService{

    private urlGetAllIncomes="http://local-api/incomes.php";

    constructor(private http:HttpClient){
        
    }

    getAllIncomesV1(): Observable<IncomesModel> {
        return this.http.get<IncomesModel>(this.urlGetAllIncomes).pipe(
            catchError(this.handleError)
        );        
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }
    



    
    getAllIncomes() : Observable<IncomesModel[]> {
        return this.http.get<IncomesModel[]>(this.urlGetAllIncomes)
        .pipe(              
        map((response : IncomesModel[]) => {
            //On retourne la liste des IncomesModels
            return response;
        }),
            tap((response) => {
                console.log(response.length.toString());
            }),
            catchError(this.handleError)
        );
    }

}