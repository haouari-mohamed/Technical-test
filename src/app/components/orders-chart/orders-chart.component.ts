import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, StatusCount } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

declare const Plotly: any;

@Component({
  selector: 'app-orders-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="heading">Orders Chart</h2>
      
      <div class="chart-tabs">
        <button 
          class="chart-tab" 
          [class.active]="chartType === 'pie'"
          (click)="setChartType('pie')">
          Pie Chart
        </button>
        <button 
          class="chart-tab" 
          [class.active]="chartType === 'bar'"
          (click)="setChartType('bar')">
          Bar Chart
        </button>
      </div>
      
      <div id="chart" class="chart-container"></div>
    </div>
  `
})
export class OrdersChartComponent implements OnInit, OnChanges {
  @Input() orders: Order[] = [];
  
  chartType: 'pie' | 'bar' = 'pie';
  statusCounts: StatusCount[] = [];
  
  constructor(private orderService: OrderService) {}
  
  ngOnInit(): void {
    this.updateChart();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders']) {
      this.updateChart();
    }
  }
  
  setChartType(type: 'pie' | 'bar'): void {
    this.chartType = type;
    this.updateChart();
  }
  
  updateChart(): void {
    if (!this.orders || this.orders.length === 0) return;
    
    this.statusCounts = this.orderService.getStatusCounts(this.orders);
    
    const chartElement = document.getElementById('chart');
    if (!chartElement) return;
    
    if (this.chartType === 'pie') {
      this.renderPieChart(chartElement);
    } else {
      this.renderBarChart(chartElement);
    }
  }
  
  renderPieChart(element: HTMLElement): void {
    const labels = this.statusCounts.map(item => item.status);
    const values = this.statusCounts.map(item => item.count);
    
    const data = [{
      type: 'pie',
      labels: labels,
      values: values,
      hole: 0.4,
      marker: {
        colors: [
          '#10B981', // Delivered -- Green
          '#FBBF24', // Pending -- Yellow
          '#EF4444'  // Cancelled -- Red
        ]
      },
      textinfo: 'label+percent',
      insidetextorientation: 'radial'
    }];
    
    const layout = {
      height: 400,
      margin: { t: 0, b: 0, l: 0, r: 0 },
      showlegend: false
    };
    
    Plotly.newPlot(element, data, layout, { responsive: true });
  }
  
  renderBarChart(element: HTMLElement): void {
    const labels = this.statusCounts.map(item => item.status);
    const values = this.statusCounts.map(item => item.count);
    
    const colors = labels.map(status => {
      if (status === 'Delivered') return '#10B981';
      if (status === 'Pending') return '#FBBF24';
      return '#EF4444'; // Cancelled
    });
    
    const data = [{
      type: 'bar',
      x: labels,
      y: values,
      marker: {
        color: colors
      },
      text: values.map(String),
      textposition: 'auto',
    }];
    
    const layout = {
      height: 400,
      margin: { t: 20, b: 40, l: 40, r: 20 },
      xaxis: {
        title: 'Status'
      },
      yaxis: {
        title: 'Number of Orders'
      }
    };
    
    Plotly.newPlot(element, data, layout, { responsive: true });
  }
}