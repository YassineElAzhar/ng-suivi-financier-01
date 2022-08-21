import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Title } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartInOutModel } from '../../model/chart.inout.model';
import { ChartService } from 'src/app/service/charts.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {

  
  chartInOutModel: ChartInOutModel; //Model pour "Revenus VS Dépenses"


  breakpoint: number; //Pour le responsive

  /*****************************************/
  
  //Revenu VS Dépenses
  public inOut_ChartLabels: string[] = [];//[ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ];
  public inOut_ChartType: ChartType = 'bar';

  //Prévisions annuel
  public forcast_ChartLabels: string[] = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ];
  public forcast_ChartType: ChartType = 'radar';

  //Dépense pie chart
  public out_ChartLabels: string[] = [ 'Epicerie', 'Internet', 'Divertissement', 'Hypothèques', 'Electricité' ];
  public out_ChartType: ChartType = 'polarArea';

  //Revenus pie chart
  public in_ChartLabels: string[] = [ 'Loyer App 1', 'Loyer App 2', 'Loyer App 4', 'Salaire', 'Autre' ];
  public in_ChartType: ChartType = 'pie';
  
  /*****************************************/
  

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  constructor(private chartService:ChartService) {
  }

  ngOnInit():void {
    //Pour le responsive
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 2;

    //On appel le webservice
    this.getInOutChartData();
    
  }
  

  ngAfterViewInit() {
    //On met à jour le graphique "Revenus VS Dépenses" avec le web service
    setTimeout(() => this.updateInOutData());
  }

  public updateInOutData(){
    this.inOut_ChartData.labels = this.chartInOutModel.chartLabels;
    this.inOut_ChartData.datasets = this.chartInOutModel.dataset;
    this.inOut_ChartType = this.chartInOutModel.chartTypeInit;
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
    datasets:[/*
      { 
        data: [ 100, 105, 120, 100, 120, 106, 92, 105, 120, 98, 100, 165 ], 
        label: 'Revenus',
        backgroundColor:'red' 
      },
      { 
        data: [ 80, 88, 56, 120, 100, 80, 80, 90, 105, 120, 100, 100 ], 
        label: 'Dépenses',
        backgroundColor: 'blue'
      }*/
    ]
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
    datasets: [
      { 
        data: [ 100, 105, 120, 100, 120 ], 
        label: 'Dépenses - Juillet 2022'//,
        //backgroundColor:'red'
      }
    ]
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
    labels: this.in_ChartLabels,
    datasets: [
      { 
        data: [ 100, 105, 120, 100, 120 ], 
        label: 'Revenus - Juillet 2020'//,
        //backgroundColor:'red'
      }
    ]
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
        data: [ 100, 105, 120, 100, 120, 106, 92, 105, 120, 98, 100, 165 ], /*,
        borderColor: 'red',
        backgroundColor: 'red',*/
      },
      {
        label: 'Dépenses',
        data: [ 80, 88, 56, 120, 100, 80, 80, 90, 105, 120, 100, 100 ], /*,
        borderColor: 'blue',
        backgroundColor: 'blue',*/
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

  public getInOutChartData() {
    this.chartService.getInOutChartData().subscribe((response: ChartInOutModel) => {
      this.chartInOutModel = response;
    });
  }




}