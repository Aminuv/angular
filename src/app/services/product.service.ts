import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
      { id: 4, name: 'Product 4', price: 400 },
      { id: 5, name: 'Product 5', price: 500 }
    ];
   }

   public getAllProducts() : Observable<Product[]> {
    let rnd=Math.random();
    if(rnd<0.1) return throwError(() => new Error("Error while fetching products"));
    else return of(this.products);
   }
   public deleteProduct(id: number) : Observable<boolean> {
    this.products = this.products.filter(product => product.id !== id);
    return of(true);
   }
}
