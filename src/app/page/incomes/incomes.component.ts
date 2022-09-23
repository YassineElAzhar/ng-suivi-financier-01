import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { IncomesModel } from '../../model/incomes.model';
import { IncomesService } from 'src/app/service/incomes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddIncomesComponent } from 'src/app/popup/incomes/addIncomes.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SetIncomeComponent } from 'src/app/popup/incomes/setIncome.component';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements AfterViewInit {

  incomesModel: IncomesModel;
  incomes: IncomesModel[];
  dataSource = new MatTableDataSource<IncomesModel>();
  displayedColumns: string[] = ['id', 'type', 'provenance','titre', 'montant', 'dateIncome'];

  //Compteur pour eviter bug de realod du ngOnInit
  cptNgOnInitReload:number = 0; //Nous l'initialisons à 0
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private incomesService:IncomesService, 
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ){
  }

  ngOnInit(){
    this.getAllIncomes();
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  public applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  public sum(key: keyof IncomesModel) {
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

  getAllIncomes() {
    this.incomesService.getAllIncomes().subscribe((response: IncomesModel[]) => {
      this.incomes = response;
      //console.log(this.incomes);
      //On met à jour le dataSource avec les valeurs venant du WebService
      this.dataSource = new MatTableDataSource<IncomesModel>(this.incomes);
      //console.log(this.dataSource.data);
    });
  }

  addIncome(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddIncomesComponent, dialogConfig);
    //Lorsque la fenêtre de dialogue se ferme, nous rechargeons la page
    this.dialog.closeAll;

    //Si le compteur est inférieur à 1
    if(this.cptNgOnInitReload < 1){
      this.dialog.afterAllClosed.subscribe(() => {
        this.ngOnInit();
        setTimeout(() => {
          this.ngAfterViewInit();
        }, 100);
      });
      //Nous incémentons le compteur de 1 pour éviter de relancer le ngOnInit()
      this.cptNgOnInitReload = this.cptNgOnInitReload+1;
    }
    //Ce comportement survient car this.dialog.afterAllClosed est relancé plusieurs fois
    //Si nous ouvrons 3 fois la fenêtre de dialogue, nous aurons 3 fenêtre de dialogue différentes
    this.dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit();
    });

  }

  setIncome(element:IncomesModel){
    //console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    let dialogRef = this.dialog.open(SetIncomeComponent, dialogConfig);
    dialogRef.componentInstance.incomeId = element.id;
    dialogRef.componentInstance.incomeTitre = element.titre;
    dialogRef.componentInstance.incomeProvenance = element.provenance;
    dialogRef.componentInstance.incomeType = element.type;
    dialogRef.componentInstance.incomeDateIncome = element.dateIncome;
    dialogRef.componentInstance.incomeMontant = element.montant;
    
    this.dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit();
    });
  }


}