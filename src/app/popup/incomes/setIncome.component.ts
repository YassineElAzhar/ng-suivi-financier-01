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


    setTimeout(() => {
      this.incomeService.getIncomeById(this.incomeId).subscribe((response: IncomesModel)  => {
        //Nous mettons à jour le formulaire avec les données venant de l'API
        this.form.patchValue({type: response.type});
        this.form.patchValue({titre: response.titre});
        this.form.patchValue({provenance: response.provenance});
        this.form.patchValue({dateIncome: response.dateIncome});
        this.form.patchValue({montant: response.montant});
      });
    }, 200);
  }
  
  
  updateIncome(form: any) {
    this.income = form.value;
    this.income.id = this.incomeId;
    //this.income.type = "1";
    this.incomeService.updateIncome(this.income).subscribe((newEvent:IncomesModel) => {
      console.log(newEvent);
    });

    // On reset le form et on ferme la fenetre de dialogue pour terminer.
    this.form.reset();
    this.dialogRef.close();
  }

  deleteIncome(form: any){

    if(confirm("Êtes vous sûr de vouloir supprimer la dépense \""+this.form.value.titre+"\"")) {
      this.incomeService.deleteIncomeById(this.incomeId.toString()).subscribe((result:String) => {
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
