import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { EventsModel } from '../model/events.model'
import { catchError, Observable, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CalendarService{

    private urlGetAllEvents="http://localhost:8080/suivi-financier/getEventsByMonth/";
    private urlAddEvent="http://local-api/addEvent.php?";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }

    getAllEvents(mois:string, annee:string) : Observable<{[key: string]: EventsModel[]}> {
        if(Number(mois) < 10){
            mois = "0"+mois;
        }
        return this.http.get<EventsModel[]>(this.urlGetAllEvents+"/"+mois+"/"+annee)
        .pipe(              
        map((response:any) => {
            return response;
        }),
            tap((response) => {
                console.log(response);
                console.log(mois + " " + annee);
            }),
            catchError(this.handleError)
        );
    }


    addEvent(event:EventsModel): Observable<any> {
        var formData: any = new FormData();

        formData.append('date_event', event.date_event);
        formData.append('end_time', event.end_time);
        formData.append('start_time', event.start_time);
        formData.append('titre', event.titre);
        formData.append('type', event.type);

        return this.http.post(
            this.urlAddEvent, 
            formData, 
            {responseType: 'json'}
        );
    }



}