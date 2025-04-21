import { Product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      { id: 1, name: 'Product 1', price: 100, promotion: true },
      { id: 2, name: 'Product 2', price: 200, promotion: false },
      { id: 3, name: 'Product 3', price: 300, promotion: true },
      { id: 4, name: 'Product 4', price: 400, promotion: false },
      { id: 5, name: 'Product 5', price: 500, promotion: true },
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

    public setPromotion(id : number) : Observable<boolean> {
      let Product = this.products.find(product => product.id === id);
      if (Product) {
        Product.promotion = !Product.promotion;
        return of(true);
      }
      else return throwError(() => new Error("Product not found"));
    }
    public searchProducts(keyword: string) : Observable<Product[]> {
      let product = this.products.filter(product=> product.name.includes(keyword));
      return of(product);
    }
}
