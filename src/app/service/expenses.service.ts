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
    private urlAddExpense="http://local-api/addExpense.php?";

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


    addExpense(expense:ExpensesModel): Observable<any> {
        var formData: any = new FormData();

        formData.append('dateExpense', expense.dateExpense);
        formData.append('destinataire', expense.destinataire);
        formData.append('id', expense.id);
        formData.append('montant', expense.montant);
        formData.append('titre', expense.titre);
        formData.append('type', expense.type);

        return this.http.post(
            this.urlAddExpense, 
            formData, 
            {responseType: 'json'}
        );
    }

}