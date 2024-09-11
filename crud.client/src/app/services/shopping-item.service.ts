import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingItem } from '../models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  private apiUrl = 'https://localhost:7234/api/shoppingitems';  // URL do seu back-end

  constructor(private http: HttpClient) { }

  getShoppingItems(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.apiUrl);
  }

  getShoppingItem(id: number): Observable<ShoppingItem> {
    return this.http.get<ShoppingItem>(`${this.apiUrl}/${id}`);
  }

  createShoppingItem(item: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>(this.apiUrl, item);
  }

  updateShoppingItem(id: number, item: ShoppingItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteShoppingItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
