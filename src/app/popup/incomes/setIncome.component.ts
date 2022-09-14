import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IncomesModel } from 'src/app/model/incomes.model';
import { IncomesService } from 'src/app/service/incomes.service';

@Component({
  selector: 'app-setIncome',
  templateUrl: './setIncome.component.html',
  styleUrls: ['./setIncome.component.scss']
})
export class SetIncomeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  income: IncomesModel;

  public incomeId: number;
  public incomeTitre: string;
  public incomeProvenance: string;
  public incomeType: string;
  public incomeDateIncome: string;
  public incomeMontant: number;


  constructor(
    private fb: FormBuilder,
    private incomeService:IncomesService,
    public dialogRef: MatDialogRef<SetIncomeComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [null],
      provenance: [null, [Validators.required, Validators.minLength(3)]],
      titre: [null, [Validators.required, Validators.minLength(10)]],
      dateIncome: [null, [Validators.required]],
      montant: [null],
    });

    //Seulement pour le test
    this.form.patchValue({type: this.incomeType});
    this.form.patchValue({titre: this.incomeTitre});
    this.form.patchValue({provenance: this.incomeProvenance});
    this.form.patchValue({dateIncome: this.incomeDateIncome});
    this.form.patchValue({montant: this.incomeMontant});
  }

  updateIncome(form: any){
    this.income = form.value;

    console.log(this.incomeId);
    console.log(this.income.titre);
    console.log(this.income.type);
    console.log(this.income.dateIncome);
    
    console.log("Income " + this.income + " has been updated");

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();

  }

  deleteIncome(form: any){

    if(confirm("Êtes vous sûr de vouloir supprimer le revenu \""+this.form.value.titre+"\"")) {
      console.log("Income " + this.incomeId + " has been deleted");
  
      // On reset le form et on ferme la fenetre de dialogue pour terminer.
      this.form.reset();
      this.dialogRef.close();
    }

  }

}
