import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { IncomesModel } from '../model/incomes.model'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IncomesService{

    //private urlGetAllIncomes="http://local-api/incomes.php";
    private urlGetAllIncomes="https://suivi-financier-backend.herokuapp.com/suivi-financier/getAllIncomes";
    private urlAddIncome="https://suivi-financier-backend.herokuapp.com/suivi-financier/addIncome";
    private urlSetIncome="https://suivi-financier-backend.herokuapp.com/suivi-financier/incomes/";
    private urlGetIncomeById="https://suivi-financier-backend.herokuapp.com/suivi-financier/getIncomeById/";
    private urlDeleteIncome = "https://suivi-financier-backend.herokuapp.com/suivi-financier/incomes/";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }

    getAllIncomes() : Observable<IncomesModel[]> {
        return this.http.get<IncomesModel[]>(this.urlGetAllIncomes)
        .pipe(              
        map((response : IncomesModel[]) => {
            return response;
        }),
            tap((response) => {
               // console.log(response.length.toString());
            }),
            catchError(this.handleError)
        );
    }

    addIncome(income:IncomesModel): Observable<any> {
        //On change le event en JSON
        const body = JSON.stringify(income);
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');

        return this.http.post<IncomesModel>(this.urlAddIncome,body,{headers})
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

    updateIncome(income:IncomesModel): Observable<any> {
        //On change le event en JSON
        const body = JSON.stringify(income);
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');


        console.log("id = " + income.id); 
        return this.http.put<IncomesModel>(this.urlSetIncome+income.id,body,{headers})
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

    

    getIncomeById(id:number) :Observable<IncomesModel>{
        return this.http.get<IncomesModel>(this.urlGetIncomeById+"/"+id)
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

    
    deleteIncomeById(id:string) :Observable<any>{
        return this.http.delete<any>(this.urlDeleteIncome+"/"+id)
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