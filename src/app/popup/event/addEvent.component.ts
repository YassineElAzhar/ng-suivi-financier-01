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
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateEvent: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
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
      console.log(newEvent.titre);
      console.log(newEvent.type);
      console.log(newEvent.dateEvent);
    });
  }


}
