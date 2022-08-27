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
      destinataire: [null, [Validators.required, Validators.minLength(3)]],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateExpense: [null, [Validators.required]],
      montant: [null]
    });
  }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }


}
