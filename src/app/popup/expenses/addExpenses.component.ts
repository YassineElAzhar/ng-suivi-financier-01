import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpensesModel } from 'src/app/model/expenses.model';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-addExpenses',
  templateUrl: './addExpenses.component.html',
  styleUrls: ['./addExpenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  expense: ExpensesModel;

  constructor(
    private fb: FormBuilder,
    private expenseService:ExpensesService,
    public dialogRef: MatDialogRef<AddExpensesComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [null],
      destinataire: [null, [Validators.required, Validators.minLength(3)]],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateExpense: [null, [Validators.required]],
      montant: [null],
    });
  }

  saveDetails(form: any) {
    this.expense = form.value;
    this.addExpense(this.expense);

    this.form.reset();
    this.dialogRef.close();
  }


  addExpense(expense:ExpensesModel) {
    this.expenseService.addExpense(expense).subscribe((newExpense:ExpensesModel) => {
      console.log(newExpense);
    });
  }

  
}
