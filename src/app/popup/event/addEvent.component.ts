import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventsModel } from 'src/app/model/events.model';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss']
})
export class AddEventComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  events: EventsModel;


  constructor(
    private fb: FormBuilder, 
    private calendarService:CalendarService,
    public dialogRef: MatDialogRef<AddEventComponent>
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

  saveDetails(form: any) {
    this.events = form.value;
    this.addEvent(this.events);

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();
  }


  addEvent(event:EventsModel) {
    this.calendarService.addEvent(event).subscribe((newEvent:EventsModel) => {
      console.log(newEvent.id);
      console.log(newEvent.title);
      console.log(newEvent.type);
      console.log(newEvent.date_event);
    });
  }


}
