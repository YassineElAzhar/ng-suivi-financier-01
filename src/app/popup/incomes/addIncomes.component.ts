import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addIncomes',
  templateUrl: './addIncomes.component.html',
  styleUrls: ['./addIncomes.component.scss']
})
export class AddIncomesComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      typeIncome: [null],
      provenance: [null, [Validators.required, Validators.minLength(3)]],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateIncome: [null, [Validators.required]],
      montant: [null],
    });
  }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }





}
