import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from './models/order.model';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrdersChartComponent } from './components/orders-chart/orders-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, OrdersTableComponent, OrdersChartComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1>Orders Dashboard</h1>
        <p>View and analyze your order data</p>
      </header>
      
      <app-orders-table (ordersFiltered)="onOrdersFiltered($event)"></app-orders-table>
      
      <app-orders-chart [orders]="filteredOrders"></app-orders-chart>
    </div>
  `
})
export class AppComponent {
  filteredOrders: Order[] = [];
  
  onOrdersFiltered(orders: Order[]): void {
    this.filteredOrders = orders;
  }
}