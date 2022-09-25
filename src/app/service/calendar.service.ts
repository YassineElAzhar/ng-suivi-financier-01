import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { EventsModel } from '../model/events.model'
import { catchError, Observable, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';
import { json } from "express";

@Injectable({
    providedIn: 'root'
})
export class CalendarService{

    private urlGetAllEvents="https://suivi-financier-backend.herokuapp.com/suivi-financier/getEventsByMonth/";
    private urlGetEventById = "https://suivi-financier-backend.herokuapp.com/suivi-financier/getEventById/";
    private urlSetEvent = "https://suivi-financier-backend.herokuapp.com/suivi-financier/events/";
    private urlAddEvent = "https://suivi-financier-backend.herokuapp.com/suivi-financier/addEvent/";
    private urlDeleteEvent = "https://suivi-financier-backend.herokuapp.com/suivi-financier/events/";

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
                //console.log(response);
            }),
            catchError(this.handleError)
        );
    }

    getEventById(id:string) :Observable<EventsModel>{
        return this.http.get<EventsModel>(this.urlGetEventById+"/"+id)
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

    addEvent(event:EventsModel): Observable<any> {
        //On change le event en JSON
        const body = JSON.stringify(event);
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');

        return this.http.post<EventsModel>(this.urlAddEvent,body,{headers})
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

    updateEvent(event:EventsModel): Observable<any> {
        //On change le event en JSON
        const body = JSON.stringify(event);
        //On prépare les httpHeaders pour passer un objet en json
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');

        return this.http.put<EventsModel>(this.urlSetEvent+event.id,body,{headers})
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

    

    deleteEventById(id:string) :Observable<any>{
        return this.http.delete<any>(this.urlDeleteEvent+"/"+id)
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