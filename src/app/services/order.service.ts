import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, StatusCount } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersData: Order[] = [
    { orderId: 1001, customerName: "John Doe", status: "Delivered" },
    { orderId: 1002, customerName: "Jane Smith", status: "Pending" },
    { orderId: 1003, customerName: "Alice Johnson", status: "Cancelled" },
    { orderId: 1004, customerName: "Bob Brown", status: "Delivered" },
    { orderId: 1005, customerName: "Charlie Black", status: "Pending" }
  ];

  private ordersSubject = new BehaviorSubject<Order[]>(this.ordersData);
  
  constructor() {}

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  getStatusCounts(orders: Order[]): StatusCount[] {
    const statusMap = new Map<string, number>();
    
    orders.forEach(order => {
      const count = statusMap.get(order.status) || 0;
      statusMap.set(order.status, count + 1);
    });
    
    return Array.from(statusMap.entries()).map(([status, count]) => ({
      status,
      count
    }));
  }

  getOrderStatuses(): string[] {
    return ['All', 'Delivered', 'Pending', 'Cancelled'];
  }
}