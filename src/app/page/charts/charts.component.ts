import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Title } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {

  breakpoint: number; //Pour le responsive

  //Revenu VS Dépenses
  public inOut_ChartLabels: string[] = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ];
  public inOut_ChartType: ChartType = 'bar';

  //Dépense pie chart
  

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  constructor() {}

  ngOnInit():void {
    //Pour le responsive
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 2;
  }

  handleSize(event:any) {
    //Pour le responsive
    this.breakpoint = (event.target.innerWidth <= 1200) ? 1 : 2;
  }
  

  //Revenu VS Dépenses
  public inOut_ChartOptions: ChartConfiguration['options'] = {
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
    datasets: [
      { 
        data: [ 100, 105, 120, 100, 120, 106, 92, 105, 120, 98, 100, 165 ], 
        label: 'Revenus',
        backgroundColor:'red' 
      },
      { 
        data: [ 80, 88, 56, 120, 100, 80, 80, 90, 105, 120, 100, 100 ], 
        label: 'Dépenses',
        backgroundColor: 'blue'
      }
    ]
  };

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public changeChartType(): void {
    this.inOut_ChartType = this.inOut_ChartType === 'bar' ? 'line' : 'bar';
  }


  //Dépenses pie chart
  

}