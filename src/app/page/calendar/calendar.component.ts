import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventsModel } from 'src/app/model/events.model';
import { AddEventComponent } from 'src/app/popup/event/addEvent.component';
import { UpdateEventComponent } from 'src/app/popup/event/updateEvent.component';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  events: {[key: string]: EventsModel[]};
  constructor(
    private fb: FormBuilder,
    private calendarService:CalendarService,
    private dialog: MatDialog
  ) { }

  mainDateCalendar = new Date();
  currentWeek:number;
  currentYearMonthFormat:string;

  //Compteur pour eviter bug de realod du ngOnInit
  cptNgOnInitReload:number = 0; //Nous l'initialisons à 0
  
  calendarWeek1:(string | number)[][];
  calendarWeek2:(string | number)[][];
  calendarWeek3:(string | number)[][];
  calendarWeek4:(string | number)[][];
  calendarWeek5:(string | number)[][];
  calendarWeek6:(string | number)[][];

  ngOnInit(): void {

    
    this.form = this.fb.group({
      moisSelect: String,
      anneeSelect: String,
    });


    this.getAllEvents((this.mainDateCalendar.getMonth()+1).toString(),this.mainDateCalendar.getFullYear().toString());

    setTimeout(() => {
      var daysToDisplay:(string | number)[][][] = this.generateDaysToDisplayArray();
      this.calendarWeek1 = daysToDisplay[0];
      this.calendarWeek2 = daysToDisplay[1];
      this.calendarWeek3 = daysToDisplay[2];
      this.calendarWeek4 = daysToDisplay[3];
      this.calendarWeek5 = daysToDisplay[4];
      this.calendarWeek6 = daysToDisplay[5];
    }, 200);

    //Nous initialisons le form avec le mois courant et l'année courante
    this.form.patchValue({moisSelect: this.mainDateCalendar.getMonth()+1});
    this.form.patchValue({anneeSelect: this.mainDateCalendar.getFullYear()});
    
  }


  public updateMainDate(year:number, month:number, day:number){
    if((!isNaN(year))&&(month>0)){
      month = month - 1;
      this.mainDateCalendar = new Date(year,month, day);
      setTimeout(() => {
        this.ngOnInit();
      }, 400);
    }
  }

  
  public goToPreviousMonth(){
    this.mainDateCalendar = new Date(this.mainDateCalendar.setMonth(this.mainDateCalendar.getMonth()-1));
    setTimeout(() => {
      this.ngOnInit();
    }, 400);
  }

  
  public goToNextMonth(){
    this.mainDateCalendar = new Date(this.mainDateCalendar.setMonth(this.mainDateCalendar.getMonth()+1));
    setTimeout(() => {
      this.ngOnInit();
    }, 400);
  }

  public getFirstDayOfCalendar():Date{
    var today = new Date(); //on récupère la date d'aujourd'hui
    today = this.mainDateCalendar;
    var currentMonthFirstDay = new Date(
      today.getFullYear(), 
      today.getMonth(), 
      1
    );//On récupère la date du premier jour du mois courant

    var firstDayDisplayed = new Date();//Initialisation de var pour le premier jour à afficher

    if(currentMonthFirstDay.getDay() !== 1){

      if(currentMonthFirstDay.getDay() == 0){
        //Dans le cas ou le premier jour est un dimanche
        firstDayDisplayed = new Date(
          currentMonthFirstDay.setDate(currentMonthFirstDay.getDate() - ( 7 - 1 ) )
        );
      }else { 
        //Nous décidons du premier jour en fonction du jour de la semaines
        firstDayDisplayed = new Date(
          currentMonthFirstDay.setDate(currentMonthFirstDay.getDate() - ( currentMonthFirstDay.getDay() - 1 ) )
        );
      }


    }else{
      //Si le premier jour est un lundi, nous affichons lundi
      firstDayDisplayed = currentMonthFirstDay;
    }

    return firstDayDisplayed;    
  }
  
  public getLastDayOfCalendar():Date{
    var today = new Date(); //on récupère la date d'aujourd'hui
    today = this.mainDateCalendar;
    var currentMonthLastDay = new Date(
      today.getFullYear(), 
      (today.getMonth() + 1), 
      0
    );//On récupère la date du premier jour du mois courant

    var lastDayDisplayed = new Date();//Initialisation de var pour le premier jour à afficher

    if(currentMonthLastDay.getDay() !== 7){
      //Nous décidons du premier jour en fonction du jour de la semaines
      lastDayDisplayed = new Date(
        currentMonthLastDay.setDate(currentMonthLastDay.getDate() + ((currentMonthLastDay.getDay() - 7)*-1) )
      );
    }else{
      //Si le premier jour est un lundi, nous afficons lundi
      lastDayDisplayed = currentMonthLastDay;
    }

    return lastDayDisplayed;       
  }

  public getMaxDayOfPreviousMonth():number{
    

    var previousMonthLastDay = new Date(
      this.mainDateCalendar.getFullYear(), 
      this.mainDateCalendar.getMonth(), 
      0
    );
    return previousMonthLastDay.getDate();
  }

  public getMaxDayOfCurrentMonth():number{
    

    var currentMonthLastDay = new Date(
      this.mainDateCalendar.getFullYear(), 
      this.mainDateCalendar.getMonth()+1, 
      0
    );
    return currentMonthLastDay.getDate();
  }

  public generateDaysToDisplayArray(): (string | number)[][][]{

    var allDaysArray = [];

    var maxDayPreviousMonth:number = this.getMaxDayOfPreviousMonth();
    var maxDayCurrentMonth:number = this.getMaxDayOfCurrentMonth();
    var firstDayToDisplay:number = this.getFirstDayOfCalendar().getDate();
    var lastDayToDisplay:number = this.getLastDayOfCalendar().getDate();
    var initalCpt:number = 1;

    var week_1 = [];
    var week_2 = [];
    var week_3 = [];
    var week_4 = [];
    var week_5 = [];
    var week_6 = [];
    var calendarDays = [];
    
    if(firstDayToDisplay != 1){
      while (firstDayToDisplay <= maxDayPreviousMonth) {
        //allDaysArray.push(firstDayToDisplay);
        allDaysArray.push(
            [ "out", firstDayToDisplay ]
        );
        firstDayToDisplay++;
      }
    }
    while (initalCpt <= maxDayCurrentMonth) {
      //allDaysArray.push(initalCpt);
      var month:string;
      var inOrCurrentClass:string;
      if(this.mainDateCalendar.getDate() === initalCpt){
        inOrCurrentClass = "current";
      } else {
        inOrCurrentClass = "in";
      }
      if(initalCpt == 1){
        switch(this.mainDateCalendar.getMonth()) { 
          case 0: { month = "er Janvier"; break; }
          case 1: { month = "er Février"; break; }
          case 2: { month = "er Mars"; break; }
          case 3: { month = "er Avril"; break; }
          case 4: { month = "er Mai"; break; }
          case 5: { month = "er Juin"; break; }
          case 6: { month = "er Juillet"; break; }
          case 7: { month = "er Aout"; break; }
          case 8: { month = "er Septembre"; break; }
          case 9: { month = "er Octobre"; break; }
          case 10: { month = "er Novembre"; break; }
          case 11: { month = "er Décembre"; break; }
          default: { month = "er"; break; } 
        }
        //allDaysArray.push([inOrCurrentClass,initalCpt+month]);
        allDaysArray.push(
          [
            inOrCurrentClass,
            initalCpt+month,
            this.createCurrentYearMonthFormat(this.mainDateCalendar.toString(), initalCpt.toString())
          ]
        );

        
      } else {
        //allDaysArray.push([inOrCurrentClass, initalCpt]);
        allDaysArray.push(
          [
            inOrCurrentClass,
            initalCpt,
            this.createCurrentYearMonthFormat(this.mainDateCalendar.toString(), initalCpt.toString())
          ]
        );
      }
      initalCpt++;
    }
    initalCpt = 1
    while (initalCpt <= lastDayToDisplay) {
      //allDaysArray.push(initalCpt);
      var month:string;
      if(initalCpt == 1){
        switch(this.mainDateCalendar.getMonth()+1) { 
          case 0: { month = "er Janvier"; break; }
          case 1: { month = "er Février"; break; }
          case 2: { month = "er Mars"; break; }
          case 3: { month = "er Avril"; break; }
          case 4: { month = "er Mai"; break; }
          case 5: { month = "er Juin"; break; }
          case 6: { month = "er Juillet"; break; }
          case 7: { month = "er Aout"; break; }
          case 8: { month = "er Septembre"; break; }
          case 9: { month = "er Octobre"; break; }
          case 10: { month = "er Novembre"; break; }
          case 11: { month = "er Décembre"; break; }
          default: { month = "er"; break; } 
       } 
        allDaysArray.push(["out",initalCpt+month]);
      } else {
        allDaysArray.push(["out", initalCpt]);
      }
      initalCpt++;
    }


    //Nous supprimons le surplus
    //allDaysArray = allDaysArray.slice(0,42);
    
    //On divise le resulat en 5 tableaux de 5 semaines
    week_1 = allDaysArray.slice(0,7);
    week_2 = allDaysArray.slice(7,14);
    week_3 = allDaysArray.slice(14,21);
    week_4 = allDaysArray.slice(21,28);
    week_5 = allDaysArray.slice(28,35);
    week_6 = allDaysArray.slice(35,42);

    //On recherche la semaine courante
    if(week_1.some(item => item[1] === this.mainDateCalendar.getDate())){
      this.currentWeek = 1;
    } else if(week_2.some(item => item[1] === this.mainDateCalendar.getDate())){
      this.currentWeek = 2;
    } else if(week_3.some(item => item[1] === this.mainDateCalendar.getDate())){
      this.currentWeek = 3;
    } else if(week_4.some(item => item[1] === this.mainDateCalendar.getDate())){
      this.currentWeek = 4;
    } else if(week_5.some(item => item[1] === this.mainDateCalendar.getDate())){
      this.currentWeek = 5;
    } else if(week_6.some(item => item[1] === this.mainDateCalendar.getDate())){
      this.currentWeek = 6;
    } else{
      this.currentWeek = 7;
    }



    //On met tout dans une tableau a deux dimensions
    calendarDays = [
      week_1,week_2,week_3,week_4,week_5,week_6
    ];
    
    //Nous supprimer la semaine 6 si on est hors du mois courrant
    if((week_6.length > 0) && (week_6[0][0] == 'out')){
      delete calendarDays[5];
    }
    
    return calendarDays;
  }

  getAllEvents(mois:string, annee:string) {
    this.calendarService.getAllEvents(mois,annee).subscribe((response: any)  => {
      this.events = response;
    });
  }

  createCurrentYearMonthFormat(str:string,day:string):string{
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + day).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  addEvent(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEventComponent, dialogConfig);
    //Lorsque la fenêtre de dialogue se ferme, nous rechargeons la page
    this.dialog.closeAll;

    //Si le compteur est inférieur à 1
    if(this.cptNgOnInitReload < 1){
      this.dialog.afterAllClosed.subscribe(() => {
        this.ngOnInit();
      });
      //Nous incémentons le compteur de 1 pour éviter de relancer le ngOnInit()
      this.cptNgOnInitReload = this.cptNgOnInitReload+1;
    }
    //Ce comportement survient car this.dialog.afterAllClosed est relancé plusieurs fois
    //Si nous ouvrons 3 fois la fenêtre de dialogue, nous aurons 3 fenêtre de dialogue différentes
  }

  udpateEvent(eventId:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    let dialogRef = this.dialog.open(UpdateEventComponent, dialogConfig);
    dialogRef.componentInstance.eventId = eventId;
  }

  

}
