import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChartInOutModel } from '../model/chart.inout.model';
import { ChartInModel } from '../model/chart.in.model';
import { ChartOutModel } from '../model/chart.out.model';
import { ChartForcastModel } from '../model/chart.forcast.model';
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChartService{

    private urlGetInOutChartData="http://localhost:8080/suivi-financier/getChartInOutCurrentYear";
    //private urlGetInOutChartData2="http://local-api/chart-in-out.php";
    private urlGetInChartData="http://local-api/chart-in.php";
    //private urlGetOutChartData="http://local-api/chart-out.php";
    private urlGetOutChartData="http://localhost:8080/suivi-financier/getChartOutCurrentMonth";
    private urlGetForcastChartData="http://local-api/chart-forcast.php";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
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
    
    //Dépenses
    getOutChartData() : Observable<ChartOutModel> {
        return this.http.get<ChartOutModel>(this.urlGetOutChartData)
        .pipe(              
        map((response : ChartOutModel) => {
            return response;
        }),
            tap((response) => {
                //console.log(response.toString());
            }),
            catchError(this.handleError)
        );
    }
    
    //Forcast
    getForcastChartData() : Observable<ChartForcastModel> {
        return this.http.get<ChartForcastModel>(this.urlGetForcastChartData)
        .pipe(              
        map((response : ChartForcastModel) => {
            return response;
        }),
            tap((response) => {
                //console.log(response.toString());
            }),
            catchError(this.handleError)
        );
    }

}