import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ExpensesModel } from '../../model/expenses.model';
import { ExpensesService } from 'src/app/service/expenses.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExpensesComponent } from 'src/app/popup/expenses/addExpenses.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements AfterViewInit {

  expensesModel: ExpensesModel;
  expenses: ExpensesModel[];
  dataSource = new MatTableDataSource<ExpensesModel>();
  displayedColumns: string[] = ['id', 'type', 'destinataire','titre', 'montant', 'dateExpense'];

  //Compteur pour eviter bug de realod du ngOnInit
  cptNgOnInitReload:number = 0; //Nous l'initialisons à 0
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private expensesService:ExpensesService, 
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ){
  }

  ngOnInit(){
    this.getAllExpenses();
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  public applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  public sum(key: keyof ExpensesModel) {
    //Si nous souhaitons afficher la somme sur toutes les valeurs
    //return this.dataSource.data.reduce((a, b) => a + (Number(b[key]) || 0), 0);

    //Si nous souhaitons afficher la somme avec le filtre
    return this.dataSource.filteredData.reduce((a,b) => a + (Number(b[key]) || 0), 0);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAllExpenses() {
    this.expensesService.getAllExpenses().subscribe((response: ExpensesModel[]) => {
      this.expenses = response;
      //console.log(this.expenses);
      //On met à jour le dataSource avec les valeurs venant du WebService
      this.dataSource = new MatTableDataSource<ExpensesModel>(this.expenses);
      //console.log(this.dataSource.data);
    });
  }

  addExpense(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddExpensesComponent, dialogConfig);
    //Lorsque la fenêtre de dialogue se ferme, nous rechargeons la page
    this.dialog.closeAll;

    //Si le compteur est inférieur à 1
    if(this.cptNgOnInitReload < 1){
      this.dialog.afterAllClosed.subscribe(() => {
        this.ngOnInit();
      });
      //Nous incémentons le compteur de 1 pour éviter de relancer le ngOnInit()
      this.cptNgOnInitReload = this.cptNgOnInitReload+1;
    }
    //Ce comportement survient car this.dialog.afterAllClosed est relancé plusieurs fois
    //Si nous ouvrons 3 fois la fenêtre de dialogue, nous aurons 3 fenêtre de dialogue différentes

  }


}