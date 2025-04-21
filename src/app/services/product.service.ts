import { PageProduct, Product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'Product 1', price: 100, promotion: true },
      { id: UUID.UUID(), name: 'Product 2', price: 200, promotion: false },
      { id: UUID.UUID(), name: 'Product 3', price: 300, promotion: true },
      { id: UUID.UUID(), name: 'Product 4', price: 400, promotion: false },
      { id: UUID.UUID(), name: 'Product 5', price: 500, promotion: true },
    ];
    for (let i = 0; i < 100; i++) {
      this.products.push({ id: UUID.UUID(), name: 'Product ' + (i + 6), price: Math.random() * 1000, promotion: Math.random() > 0.5 });
    }
   }

   public getAllProducts() : Observable<Product[]> {
    let rnd=Math.random();
    if(rnd<0.1) return throwError(() => new Error("Error while fetching products"));
    else return of(this.products);
   }

   public getPageProducts(page:number, size:number) : Observable<PageProduct> {
    let index = page*size;
    let totalPages = ~~this.products/size;
    if (this.products.length % size != 0) totalPages++;
    let PageProduct = this.products.slice(index, index+size);
    return of({products: PageProduct, Products: PageProduct, page: page, size: size, totalPages: totalPages});
   }


   public deleteProduct(id: string) : Observable<boolean> {
    this.products = this.products.filter(product => product.id !== id);
    return of(true);
   }

    public setPromotion(id : string) : Observable<boolean> {
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
