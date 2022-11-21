import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChartInOutModel } from '../model/chart.inout.model';
import { ChartInModel } from '../model/chart.in.model';
import { ChartOutModel } from '../model/chart.out.model';
import { ChartForcastModel } from '../model/chart.forcast.model';
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';
import { ChartInflationModel } from "../model/chart.inflation.model";

@Injectable({
    providedIn: 'root'
})
export class ChartService{

    //private urlGetInOutChartData2="http://local-api/chart-in-out.php";
    private urlGetInOutChartData="http://localhost:8080/suivi-financier/getChartInOutCurrentYear";
    //private urlGetInChartData="http://local-api/chart-in.php";
    private urlGetInChartData="http://localhost:8080/suivi-financier/getChartInCurrentMonth";
    //private urlGetOutChartData="http://local-api/chart-out.php";
    private urlGetOutChartData="http://localhost:8080/suivi-financier/getChartOutCurrentMonth";
    private urlGetForcastChartData="http://local-api/chart-forcast.php";
    private urlGetInflationChartData="http://localhost:8080/suivi-financier/getInflationRate";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }

    //Dépenses VS Revenus    
    getInOutChartData() : Observable<ChartInOutModel> {
        return this.http.get<ChartInOutModel>(this.urlGetInOutChartData+"/"+localStorage.getItem("userId"))
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
        return this.http.get<ChartInModel>(this.urlGetInChartData+"/"+localStorage.getItem("userId"))
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
        return this.http.get<ChartOutModel>(this.urlGetOutChartData+"/"+localStorage.getItem("userId"))
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
    
    //Inflation
    getInflationChartData() : Observable<ChartInflationModel> {
        return this.http.get<ChartInflationModel>(this.urlGetInflationChartData)
        .pipe(              
        map((response : ChartInflationModel) => {
            return response;
        }),
            tap((response) => {
                //console.log(response.toString());
            }),
            catchError(this.handleError)
        );
    }

}