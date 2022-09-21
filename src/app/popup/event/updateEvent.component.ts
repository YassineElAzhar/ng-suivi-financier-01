import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';
import { EventsModel } from 'src/app/model/events.model';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-updateEvent',
  templateUrl: './updateEvent.component.html',
  styleUrls: ['./updateEvent.component.scss']
})
export class UpdateEventComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  events: EventsModel;

  public eventId: number;
  
  constructor(
    private fb: FormBuilder, 
    private calendarService:CalendarService,
    public dialogRef: MatDialogRef<UpdateEventComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [null],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateEvent: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
    });


    setTimeout(() => {
      this.calendarService.getEventById(this.eventId.toString()).subscribe((response: EventsModel)  => {
        //Nous mettons à jour le formulaire avec les données venant de l'API
        this.form.patchValue({titre: response.titre});
        this.form.patchValue({type: response.type.toString()});
        this.form.patchValue({dateEvent: response.dateEvent});
        this.form.patchValue({startTime: response.startTime});
        this.form.patchValue({endTime: response.endTime});
      });
    }, 200);
  }

  updateEvent(form: any) {
    this.events = form.value;
    this.events.id = this.eventId;
    console.log(this.events.id);
    console.log(this.events.titre);
    console.log(this.events.type);
    console.log(this.events.dateEvent);
    
    console.log("Event " + this.eventId + " has been updated");

    this.calendarService.updateEvent(this.events).subscribe((newEvent:EventsModel) => {
      console.log(newEvent.id);
      console.log(newEvent.titre);
      console.log(newEvent.type);
      console.log(newEvent.dateEvent);
    });

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();
  }

  deleteEvent(form: any) {

    if(confirm("Êtes vous sûr de vouloir supprimer l'évenement \""+this.form.value.titre+"\"")) {
      console.log("Event " + this.eventId + " has been deleted");
  
      // On reset le form et on ferme la fenetre de dialogue pour terminer.
      this.form.reset();
      this.dialogRef.close();
    }

  }




}
