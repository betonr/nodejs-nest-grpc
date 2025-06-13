import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CheckStockRequest {
  productId: string;
}

export interface StockResponse {
  productId: string;
  quantity: number;
  inStock: boolean;
}

export interface InventoryServiceClient {
  checkStock(data: CheckStockRequest): Observable<StockResponse>;
}
