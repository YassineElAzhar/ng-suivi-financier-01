import { ChartConfiguration, ChartData, ChartEvent, ChartType, Title } from 'chart.js';

export interface ChartOutModel {
    chartLabels: string[];// or Array<string>;
    chartTypeInit: ChartType;
    dataset: {
        label: string, 
        data:number[] 
    }[];
}