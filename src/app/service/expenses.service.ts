import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ExpensesModel } from '../model/expenses.model'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService{

    //private urlGetAllExpenses="http://local-api/expenses.php";
    private urlGetAllExpenses="http://localhost:8080/suivi-financier/getAllExpenses";
    private urlAddExpense="http://localhost:8080/suivi-financier/addExpense";
    private urlSetExpense="http://localhost:8080/suivi-financier/expenses/";
    private urlGetExpenseById="http://localhost:8080/suivi-financier/getExpenseById/";
    private urlDeleteExpense = "http://localhost:8080/suivi-financier/expenses/";

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
        //On change le event en JSON
        const body = JSON.stringify(expense);
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');

        return this.http.post<ExpensesModel>(this.urlAddExpense,body,{headers})
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

    updateExpense(expense:ExpensesModel): Observable<any> {
        //On change le event en JSON
        const body = JSON.stringify(expense);
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');


        console.log("id = " + expense.id); 
        return this.http.put<ExpensesModel>(this.urlSetExpense+expense.id,body,{headers})
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

    

    getExpenseById(id:number) :Observable<ExpensesModel>{
        return this.http.get<ExpensesModel>(this.urlGetExpenseById+"/"+id)
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

    
    deleteExpenseById(id:string) :Observable<any>{
        return this.http.delete<any>(this.urlDeleteExpense+"/"+id)
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