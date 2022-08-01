import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpensesModel } from '../../model/expenses.model';
import { ELEMENT_DATA_EXPENSES } from '../../mock-data/mock-expenses-list';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'type', 'provenance','titre', 'montant', 'dateExpense'];
  
  dataSource = new MatTableDataSource<ExpensesModel>(ELEMENT_DATA_EXPENSES);

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}