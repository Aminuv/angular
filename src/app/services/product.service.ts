import { PageProduct, Product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  public updateProduct(id: string, updatedProduct: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      return throwError(() => new Error('Product not found'));
    }
    this.products[index] = { ...updatedProduct, id };
    return of(this.products[index]);
  }

  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'Product 1', price: 100, promotion: true },
      { id: UUID.UUID(), name: 'Product 2', price: 200, promotion: false },
      { id: UUID.UUID(), name: 'Product 3', price: 300, promotion: true },
      { id: UUID.UUID(), name: 'Product 4', price: 400, promotion: false },
      { id: UUID.UUID(), name: 'Product 5', price: 500, promotion: true },
    ];
    for (let i = 0; i < 50; i++) {
      this.products.push({ id: UUID.UUID(), name: 'Product ' + (i + 6), price: Math.random() * 1000, promotion: Math.random() > 0.5 });
    }
   }

   public getAllProducts() : Observable<Product[]> {
    let rnd=Math.random();
    if(rnd<0.1) return throwError(() => new Error("Error while fetching products"));
    else return of(this.products);
   }

   public addNewProduct(product: Product): Observable<Product> {
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
   }

   public getPageProducts(page:number, size:number) : Observable<PageProduct> {
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
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
    
    public searchProducts(keyword: string, page : number, size : number) : Observable<PageProduct> {
      let result = this.products.filter(product=> product.name.includes(keyword));
      let index = page*size;
    let totalPages = ~~(result.length/size);
    if (this.products.length % size != 0) totalPages++;
    let PageProduct = result.slice(index, index+size);
    return of({products: PageProduct, Products: PageProduct, page: page, size: size, totalPages: totalPages});
    }

    public getProduct(id: string) : Observable<Product> {
      let Product = this.products.find(product => product.id === id);
      if (Product) return of(Product);
      else return throwError(() => new Error("Product not found"));
    }

     getErrorMessage(fieldName: string, errors: any) {
    if (errors.required) {
      return `${fieldName} is required`;
    }
    else if (errors.minlength) {
      return `${fieldName} must be at least ${errors.minlength.requiredLength} characters long`;
    }
    else if (errors.min) {
      return `${fieldName} should have a minimum value of ${errors.min.min}`;
    }
    return '';
  }

  public getProducts(product: Product): Observable<Product[]> {
    this.products = this.products.map(p => (p.id === product.id) ? product : p);
    return of(this.products);
  }
}
