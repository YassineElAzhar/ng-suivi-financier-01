import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Title } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartInOutModel } from '../../model/chart.inout.model';
import { ChartInModel } from '../../model/chart.in.model';
import { ChartOutModel } from '../../model/chart.out.model';
import { ChartForcastModel } from '../../model/chart.forcast.model';
import { ChartService } from 'src/app/service/charts.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {

  
  chartInOutModel: ChartInOutModel; //Model pour "Revenus VS Dépenses"
  chartInModel: ChartInModel; //Model pour "Revenus"
  chartOutModel: ChartOutModel; //Model pour "Dépenses"
  chartForcastModel: ChartForcastModel; //Model pour "Dépenses"

  breakpoint: number; //Pour le responsive

  /*****************************************/
  
  //Revenu VS Dépenses
  public inOut_ChartLabels: string[] = [];
  public inOut_ChartType: ChartType;

  //Prévisions annuel
  public forcast_ChartLabels: string[] = [];
  public forcast_ChartType: ChartType = 'bar';

  //Dépense pie chart
  public out_ChartLabels: string[] = [];
  public out_ChartType: ChartType;

  //Revenus pie chart
  public in_ChartLabels: string[] = [];
  public in_ChartType: ChartType;
  
  /*****************************************/
  

  @ViewChild(BaseChartDirective) charts: BaseChartDirective | undefined;
  
  constructor(private chartService:ChartService) {
  }

  ngOnInit():void {
    //Pour le responsive
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 2;

    //On appel le webservice
    this.getInOutChartData();
    this.getInChartData();
    this.getOutChartData();
    this.getForcastChartData();
  }
  

  ngAfterViewInit() {
    //On met à jour le graphique "Revenus VS Dépenses" avec le web service 
    this.updateInOutData();
    this.updateInData();
    this.updateOutData();
    this.updateForcastData();
    this.charts?.update;

    setTimeout(() => {
      this.inOut_ChartType = this.inOut_ChartType === 'bar' ? 'line' : 'bar';
      this.out_ChartType = this.out_ChartType === 'pie' ? 'polarArea' : 'pie';
      this.in_ChartType = this.in_ChartType === 'polarArea' ? 'pie' : 'polarArea';
      this.forcast_ChartType = this.forcast_ChartType === 'radar' ? 'line' : 'radar';
    }, 500);
  }

  public async updateInOutData(){
    //Dépenses VS Revenus - Mise à jour des données avec l'API
    setTimeout(() => {
      this.inOut_ChartData.labels = this.chartInOutModel.chartLabels;
      this.inOut_ChartData.datasets = this.chartInOutModel.dataset;
      this.inOut_ChartType = this.chartInOutModel.chartTypeInit;
    }, 500);
  }

  public async updateInData(){
    //Revenus - Mise à jour des données avec l'API    
    setTimeout(() => {
      this.in_ChartData.labels = this.chartInModel.chartLabels;
      this.in_ChartData.datasets = this.chartInModel.dataset;
      this.in_ChartType = this.chartInModel.chartTypeInit;
    }, 500);
  }

  public async updateOutData(){
    setTimeout(() => {
      //Dépenses - Mise à jour des données avec l'API
      this.out_ChartData.labels = this.chartOutModel.chartLabels;
      this.out_ChartData.datasets = this.chartOutModel.dataset;
      this.out_ChartType = this.chartOutModel.chartTypeInit;
    }, 500);
  }

  public async updateForcastData(){
    setTimeout(() => {
      //Dépenses - Mise à jour des données avec l'API
      this.forcast_ChartData.labels = this.chartForcastModel.chartLabels;
      this.forcast_ChartData.datasets = this.chartForcastModel.dataset;
      this.forcast_ChartType = this.chartForcastModel.chartTypeInit;
      this.forcast_ChartLabels = this.chartForcastModel.chartLabels;
    }, 500);
  }

  handleSize(event:any) {
    //Pour le responsive
    this.breakpoint = (event.target.innerWidth <= 1200) ? 1 : 2;
  }
  
  /**
   * Revenu VS Dépenses
   **/
  public inOut_ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: { min: 10 }
    },
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Revenus VS Dépenses"}
    }
  };

  public inOut_ChartData: ChartData<'bar'> = {
    labels: this.inOut_ChartLabels,
    datasets:[]
  };

  public inOutChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public inOutChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public inOutChangeChartType(): void {
    this.inOut_ChartType = this.inOut_ChartType === 'bar' ? 'line' : 'bar';
  }


  /**
   * Dépenses 
   **/
  public out_ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: { min: 10 }
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Dépenses - Juillet 2022"}
    }
  };

  public out_ChartData: ChartData<'pie'> = {
    labels: this.out_ChartLabels,
    datasets: []
  };

  public outChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public outChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public outChangeChartType(): void {
    this.out_ChartType = this.out_ChartType === 'pie' ? 'polarArea' : 'pie';
  }
  
  

  /**
   * Revenus 
   **/
   public in_ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: { min: 10 }
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Revenus - Juillet 2020"}
    }
  };

  public in_ChartData: ChartData<'polarArea'> = {
    /*labels: this.in_ChartLabels,*/
    datasets: []
  };

  public inChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public inChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public inChangeChartType(): void {
    this.in_ChartType = this.in_ChartType === 'polarArea' ? 'pie' : 'polarArea';
  }

  
  /**
   * Previsions annuel 
   **/
   public forcast_ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: { min: 10 }
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Prévisions annuel"}
    }
  };

  public forcast_ChartData: ChartData<'polarArea'> = {
    labels: this.forcast_ChartLabels,
    datasets: [
      {
        label: 'Revenus',
        data: [] //[ 100, 105, 120, 100, 120, 106, 92, 105, 120, 98, 100, 165 ], 
        /*,
        borderColor: 'red',
        backgroundColor: 'red',
        */
      },
      {
        label: 'Dépenses',
        data: [] //[ 80, 88, 56, 120, 100, 80, 80, 90, 105, 120, 100, 100 ], 
        /*,
        borderColor: 'blue',
        backgroundColor: 'blue',
        */
      }
    ]

    
  };

  public forcastChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public forcastChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public forcastChangeChartType(): void {
    this.forcast_ChartType = this.forcast_ChartType === 'radar' ? 'line' : 'radar';
  }


  // Call the API with the services
  public getInOutChartData() {
    this.chartService.getInOutChartData().subscribe((response: ChartInOutModel) => {
      //console.log(response);
      this.chartInOutModel = response;
    });
  }

  public getInChartData() {
    this.chartService.getInChartData().subscribe((response: ChartInModel) => {
      this.chartInModel = response;
    });
  }

  public getOutChartData() {
    this.chartService.getOutChartData().subscribe((response: ChartOutModel) => {
      this.chartOutModel = response;
    });
  }

  public getForcastChartData() {
    this.chartService.getForcastChartData().subscribe((response: ChartForcastModel) => {
      this.chartForcastModel = response;
    });
  }




}