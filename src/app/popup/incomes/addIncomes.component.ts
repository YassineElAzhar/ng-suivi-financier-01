import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IncomesModel } from 'src/app/model/incomes.model';
import { IncomesService } from 'src/app/service/incomes.service';

@Component({
  selector: 'app-addIncomes',
  templateUrl: './addIncomes.component.html',
  styleUrls: ['./addIncomes.component.scss']
})
export class AddIncomesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  income: IncomesModel;

  constructor(
    private fb: FormBuilder,
    private incomeService:IncomesService,
    public dialogRef: MatDialogRef<AddIncomesComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [null],
      provenance: [null, [Validators.required, Validators.minLength(3)]],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateIncome: [null, [Validators.required]],
      montant: [null],
    });
  }

  saveDetails(form: any) {
    this.income = form.value;
    this.addIncome(this.income);

    this.form.reset();
    this.dialogRef.close();
  }


  addIncome(income:IncomesModel) {
    this.incomeService.addIncome(income).subscribe((newIncome:IncomesModel) => {
      console.log(newIncome);
    });
  }

  
}
