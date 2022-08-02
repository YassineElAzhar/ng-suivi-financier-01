import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpensesModel } from '../../model/expenses.model';
import { ExpensesService } from 'src/app/service/expenses.service';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private expensesService:ExpensesService){
  }

  ngOnInit(){
    this.getAllExpenses();
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  public sum(key: keyof ExpensesModel) {
    return this.dataSource.data.reduce((a, b) => a + (Number(b[key]) || 0), 0);
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


}