import { ChartConfiguration, ChartData, ChartEvent, ChartType, Title } from 'chart.js';

export interface ChartForcastModel {
    chartLabels: string[];// or Array<string>;
    chartTypeInit: ChartType;
    dataset: {
        label: string, 
        backgroundColor: string, 
        data:number[] 
    }[];
}