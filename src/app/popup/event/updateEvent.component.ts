import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
      title: [null, [Validators.required, Validators.minLength(10)]],
      date_event: [null, [Validators.required]],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
    });

    //Seulement pour le test
    this.form.patchValue({type: 'immobilier'});
    this.form.patchValue({title: 'Ceci est un titre '.concat(this.eventId.toString())});
    this.form.patchValue({date_event: '2022-09-05T04:00:00.000Z'});
    this.form.patchValue({start_time: '00:00'});
    this.form.patchValue({end_time: '01:00'});
  }

  updateEvent(form: any) {
    this.events = form.value;

    console.log(this.events.id);
    console.log(this.events.title);
    console.log(this.events.type);
    console.log(this.events.date_event);
    
    console.log("Event " + this.eventId + " has been updated");

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();
  }

  deleteEvent(form: any) {

    if(confirm("Êtes vous sûr de vouloir supprimer l'évenement \""+this.form.value.title+"\"")) {
      console.log("Event " + this.eventId + " has been deleted");
  
      // On reset le form et on ferme la fenetre de dialogue pour terminer.
      this.form.reset();
      this.dialogRef.close();
    }

  }




}
