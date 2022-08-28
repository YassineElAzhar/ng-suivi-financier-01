import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEventComponent } from 'src/app/popup/event/addEvent.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private dialog: MatDialog
  ) { }

  mainDateCalendar = new Date();
  currentWeek:number;
  
  calendarWeek1:(string | number)[][];
  calendarWeek2:(string | number)[][];
  calendarWeek3:(string | number)[][];
  calendarWeek4:(string | number)[][];
  calendarWeek5:(string | number)[][];

  ngOnInit(): void {
    //this.updateMainDate(2022,8,1) //mois qui commence par un lundi
    //this.updateMainDate(2022,9,1) //mois quelconque
    //this.updateMainDate(2023,4,1) //mois qui termine par un dimanche
    //console.log(this.generateDaysToDisplayArray());

    this.calendarWeek1 = this.generateDaysToDisplayArray()[0];
    this.calendarWeek2 = this.generateDaysToDisplayArray()[1];
    this.calendarWeek3 = this.generateDaysToDisplayArray()[2];
    this.calendarWeek4 = this.generateDaysToDisplayArray()[3];
    this.calendarWeek5 = this.generateDaysToDisplayArray()[4];
  }

  public test(temp:any){
    console.log(temp);
  }
  
  public updateMainDate(year:number, month:number, day:number){
    month = month - 1;
    this.mainDateCalendar = new Date(year,month, day);
    setTimeout(() => {
      this.ngOnInit();
    }, 200);
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
      //Nous décidons du premier jour en fonction du jour de la semaines
      firstDayDisplayed = new Date(
        currentMonthFirstDay.setDate(currentMonthFirstDay.getDate() - ( currentMonthFirstDay.getDay() - 1 ) )
      );
    }else{
      //Si le premier jour est un lundi, nous afficons lundi
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
    var calendarDays = [];
    
    if(firstDayToDisplay != 1){
      while (firstDayToDisplay <= maxDayPreviousMonth) {
        //allDaysArray.push(firstDayToDisplay);
        allDaysArray.push(["out",firstDayToDisplay]);
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
        allDaysArray.push([inOrCurrentClass,initalCpt+month]);
      } else {
        allDaysArray.push([inOrCurrentClass, initalCpt]);
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
      //allDaysArray.push(["out",initalCpt]);
      initalCpt++;
    }
    //Nous supprimons le surplus
    allDaysArray = allDaysArray.slice(0,35);
    
    //On divise le resulat en 5 tableaux de 5 semaines
    week_1 = allDaysArray.slice(0,7);
    week_2 = allDaysArray.slice(7,14);
    week_3 = allDaysArray.slice(14,21);
    week_4 = allDaysArray.slice(21,28);
    week_5 = allDaysArray.slice(28,35);

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
    } 



    //On met tout dans une tableau a deux dimensions
    calendarDays = [
      week_1,week_2,week_3,week_4,week_5
    ];
    
    return calendarDays;
  }

  addEvent(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEventComponent, dialogConfig);

  }


}
