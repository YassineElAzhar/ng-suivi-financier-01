import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpensesModel } from 'src/app/model/expenses.model';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-setExpense',
  templateUrl: './setExpense.component.html',
  styleUrls: ['./setExpense.component.scss']
})
export class SetExpenseComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  expense: ExpensesModel;

  public expenseId: number;
  public expenseTitre: string;
  public expenseDestinataire: string;
  public expenseType: string;
  public expenseDateExpense: string;
  public expenseMontant: number;


  constructor(
    private fb: FormBuilder,
    private expenseService:ExpensesService,
    public dialogRef: MatDialogRef<SetExpenseComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [null],
      destinataire: [null, [Validators.required, Validators.minLength(3)]],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateExpense: [null, [Validators.required]],
      montant: [null],
    });

    //Seulement pour le test
    this.form.patchValue({type: this.expenseType});
    this.form.patchValue({titre: this.expenseTitre});
    this.form.patchValue({destinataire: this.expenseDestinataire});
    this.form.patchValue({dateExpense: this.expenseDateExpense});
    this.form.patchValue({montant: this.expenseMontant});
  }

  updateExpense(form: any){
    this.expense = form.value;

    console.log(this.expenseId);
    console.log(this.expense.titre);
    console.log(this.expense.type);
    console.log(this.expense.dateExpense);
    
    console.log("Expense " + this.expense + " has been updated");

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();

  }

  deleteExpense(form: any){

    if(confirm("Êtes vous sûr de vouloir supprimer la dépense \""+this.form.value.titre+"\"")) {
      console.log("Expense " + this.expenseId + " has been deleted");
  
      // On reset le form et on ferme la fenetre de dialogue pour terminer.
      this.form.reset();
      this.dialogRef.close();
    }

  }

}
