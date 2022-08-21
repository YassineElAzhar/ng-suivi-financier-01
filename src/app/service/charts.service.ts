import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ChartInOutModel } from '../model/chart.inout.model'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChartService{

    private urlGetInOutChartData="http://local-api/chart-in-out.php";

    constructor(private http:HttpClient){
        
    }


    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }
    



    
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

}