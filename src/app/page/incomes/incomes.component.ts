import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IncomesModel } from '../../model/incomes.model';
import { ELEMENT_DATA_INCOMES } from '../../mock-data/mock-incomes-list';
import { IncomesService } from '../../service/incomes.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements AfterViewInit {

  incomesModel: IncomesModel;
  members: IncomesModel[];
  displayedColumns: string[] = ['id', 'type', 'provenance','titre', 'montant', 'dateIncome'];
  //Si nous souhations utiliser la mock-list, nous utiliserions cette declaration de dataSource
  //dataSource = new MatTableDataSource<IncomesModel>(ELEMENT_DATA_INCOMES);
  dataSource = new MatTableDataSource<IncomesModel>();


  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private incomesService:IncomesService){}

  ngOnInit(){
    //this.getAllIncomesV1();
    this.getAllIncomes();
  }

  ngAfterViewInit() {
    //Pour l'initialiser directement
    //this.dataSource.paginator = this.paginator;

    //Nous allons ajouter un timeout
    //C'est pour laisser le temps de récupérer les donnée du webservice
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  
  public applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  public sum(key: keyof IncomesModel) {
    return this.dataSource.data.reduce((a, b) => a + (Number(b[key]) || 0), 0);
  }


  public getAllIncomesV1(){
    this.incomesService.getAllIncomesV1().subscribe({
      next(result) { 
          console.log(result);
      },
      error(errorMessage){
        console.log("Error" + errorMessage);
      },
      complete(){
        console.log("La fonction getAllIncomes est terminée");
      }
    });
  }



  getAllIncomes() {
    this.incomesService.getAllIncomes().subscribe((response: IncomesModel[]) => {
      this.members = response;
      console.log(this.members);
      //On met à jour le dataSource avec les valeurs venant du WebService
      this.dataSource = new MatTableDataSource<IncomesModel>(this.members);
      console.log(this.dataSource.data);
    });
  }


}