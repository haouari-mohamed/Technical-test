import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2 class="heading">Orders</h2>
      
      <div class="filter-section">
        <label for="statusFilter">Filter by Status:</label>
        <select 
          id="statusFilter" 
          class="select" 
          [(ngModel)]="selectedStatus"
          (change)="applyFilters()">
          <option *ngFor="let status of statuses" [value]="status">{{ status }}</option>
        </select>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th (click)="sort('orderId')">
              Order ID
              <span class="sort-icon" *ngIf="sortColumn === 'orderId'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th (click)="sort('customerName')">
              Customer Name
              <span class="sort-icon" *ngIf="sortColumn === 'customerName'">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of filteredOrders">
            <td>{{ order.orderId }}</td>
            <td>{{ order.customerName }}</td>
            <td>
              <span class="badge" 
                [ngClass]="{
                  'badge-delivered': order.status === 'Delivered',
                  'badge-pending': order.status === 'Pending',
                  'badge-cancelled': order.status === 'Cancelled'
                }">
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OrdersTableComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  statuses: string[] = [];
  selectedStatus: string = 'All';
  sortColumn: string = 'orderId';
  sortDirection: 'asc' | 'desc' = 'asc';

  @Output() ordersFiltered = new EventEmitter<Order[]>();
  
  constructor(private orderService: OrderService) {}
  
  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.applyFilters();
    });
    
    this.statuses = this.orderService.getOrderStatuses();
  }
  
  applyFilters(): void {
    let result = [...this.orders];
    
    // Apply status filter
    if (this.selectedStatus !== 'All') {
      result = result.filter(order => order.status === this.selectedStatus);
    }
    
    // Apply sorting for the table
    result.sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Order];
      const bValue = b[this.sortColumn as keyof Order];
      
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    this.filteredOrders = result;
    this.ordersFiltered.emit(this.filteredOrders);
  }
  
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.applyFilters();
  }
}