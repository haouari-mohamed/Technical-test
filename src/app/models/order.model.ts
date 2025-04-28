export interface Order {
  orderId: number;
  customerName: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
}

export interface StatusCount {
  status: string;
  count: number;
}