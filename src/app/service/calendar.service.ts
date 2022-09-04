import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { EventsModel } from '../model/events.model'
import { catchError, Observable, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CalendarService{

    private urlGetAllEvents="http://local-api/calendar.php";
    private urlAddEvent="http://local-api/addEvent.php?";

    constructor(private http:HttpClient){
        
    }

    handleError (error: HttpErrorResponse){
        return throwError(() => error.message);
    }

    getAllEvents() : Observable<{[key: string]: EventsModel[]}> {
        return this.http.get<EventsModel[]>(this.urlGetAllEvents)
        .pipe(              
        map((response:any) => {
            return response;
        }),
            tap((response) => {
               // console.log(response.length.toString());
            }),
            catchError(this.handleError)
        );
    }


    addEvent(event:EventsModel): Observable<any> {
        var formData: any = new FormData();

        formData.append('date_event', event.date_event);
        formData.append('end_time', event.end_time);
        formData.append('start_time', event.start_time);
        formData.append('title', event.title);
        formData.append('type', event.type);

        return this.http.post(
            this.urlAddEvent, 
            formData, 
            {responseType: 'json'}
        );
    }



}