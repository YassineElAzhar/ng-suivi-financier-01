import { ChartConfiguration, ChartData, ChartEvent, ChartType, Title } from 'chart.js';

export interface ChartInModel {
    chartLabels: string[];// or Array<string>;
    chartTypeInit: ChartType;
    dataset: {
        label: string, 
        data:number[] 
    }[];
}