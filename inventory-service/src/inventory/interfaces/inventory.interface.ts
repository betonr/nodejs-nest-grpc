export interface CheckStockRequest {
  productId: string;
}

export interface StockResponse {
  productId: string;
  quantity: number;
  inStock: boolean;
}
