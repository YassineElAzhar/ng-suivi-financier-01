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

    //private urlGetInOutChartData2="http://local-api/chart-in-out.php";
    private urlGetInOutChartData="https://suivi-financier-backend.herokuapp.com/suivi-financier/getChartInOutCurrentYear";
    //private urlGetInChartData="http://local-api/chart-in.php";
    private urlGetInChartData="https://suivi-financier-backend.herokuapp.com/suivi-financier/getChartInCurrentMonth";
    //private urlGetOutChartData="http://local-api/chart-out.php";
    private urlGetOutChartData="https://suivi-financier-backend.herokuapp.com/suivi-financier/getChartOutCurrentMonth";
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