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
    console.log("Event " + this.eventId + " has been deleted");

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();
  }




}
