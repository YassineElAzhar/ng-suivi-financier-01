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


    setTimeout(() => {
      this.expenseService.getExpenseById(this.expenseId).subscribe((response: ExpensesModel)  => {
        //Nous mettons à jour le formulaire avec les données venant de l'API

        //Nous recupérons la date en objet
        var dateFormat = new Date(response.dateExpense);
        dateFormat.setDate(dateFormat.getDate() + 1);

        this.form.patchValue({type: response.type});
        this.form.patchValue({titre: response.titre});
        this.form.patchValue({destinataire: response.destinataire});
        this.form.patchValue({dateExpense: dateFormat});
        this.form.patchValue({montant: response.montant});
      });
    }, 200);
  }
  
  
  updateExpense(form: any) {
    this.expense = form.value;
    this.expense.id = this.expenseId;
    //this.expense.type = "1";
    this.expenseService.updateExpense(this.expense).subscribe((newEvent:ExpensesModel) => {
      console.log(newEvent);
    });

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();
  }

  deleteExpense(form: any){

    if(confirm("Êtes vous sûr de vouloir supprimer la dépense \""+this.form.value.titre+"\"")) {
      this.expenseService.deleteExpenseById(this.expenseId.toString()).subscribe((result:String) => {
        //console.log(result);
      });
  
      // On reset le form et on ferme la fenetre de dialogue pour terminer.
      this.form.reset();
      this.dialogRef.close();
    }

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();

  }

}
