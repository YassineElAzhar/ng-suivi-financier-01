import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { EventsModel } from '../model/events.model'
import { catchError, Observable, Subject, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CalendarService{

    private urlGetAllEvents="http://local-api/calendar.php";

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

}