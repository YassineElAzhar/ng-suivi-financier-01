import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ExpensesModel } from '../model/expenses.model'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService{

    private urlGetAllExpenses="http://local-api/expenses.php";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }

    getAllExpenses() : Observable<ExpensesModel[]> {
        return this.http.get<ExpensesModel[]>(this.urlGetAllExpenses)
        .pipe(              
        map((response : ExpensesModel[]) => {
            return response;
        }),
            tap((response) => {
               // console.log(response.length.toString());
            }),
            catchError(this.handleError)
        );
    }

}