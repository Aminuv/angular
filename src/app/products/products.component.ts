import { Product } from '../model/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
handlDeleteProduct(_t18: any) {
throw new Error('Method not implemented.');
}
  products! : Array<Product>;
  errorMessage! : string;
  

  constructor( private ProductService : ProductService) { }

  ngOnInit(): void {
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.ProductService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    }); 
  }



  handleDeleteProduct(product:Product) {
    let confirmation = confirm("Are you sure you want to delete this product?");
    if(!confirmation) return;

    this.ProductService.deleteProduct(product.id).subscribe({
      next: (data) => {
        //this.handleGetAllProducts();
        let index=this.products.indexOf(product);
        this.products.splice(index, 1);
      }
   });
      
  }
  handleSetPromotion(product:Product) {
    let promo=product.promotion;
    this.ProductService.setPromotion(product.id).subscribe({
      next: (data) => {
        product.promotion = !promo;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }
}
