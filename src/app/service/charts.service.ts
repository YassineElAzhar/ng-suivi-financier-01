import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChartInOutModel } from '../model/chart.inout.model';
import { ChartInModel } from '../model/chart.in.model';
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChartService{

    private urlGetInOutChartData="http://local-api/chart-in-out.php";
    private urlGetInChartData="http://local-api/chart-in.php";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
        console.log("here");
        return throwError(() => error.message);
    }

    //Dépenses VS Revenus    
    getInOutChartData() : Observable<ChartInOutModel> {
        return this.http.get<ChartInOutModel>(this.urlGetInOutChartData)
        .pipe(              
        map((response : ChartInOutModel) => {
            return response;
        }),
            tap((response) => {
                //console.log(response.toString());
            }),
            catchError(this.handleError)
        );
    }
    
    //Revenus
    getInChartData() : Observable<ChartInModel> {
        return this.http.get<ChartInModel>(this.urlGetInChartData)
        .pipe(              
        map((response : ChartInModel) => {
            return response;
        }),
            tap((response) => {
                //console.log(response.toString());
            }),
            catchError(this.handleError)
        );
    }

}