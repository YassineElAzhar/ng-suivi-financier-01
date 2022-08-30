import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss']
})
export class AddEventComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      typeExpense: [null],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateExpense: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
    });
  }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }


}
