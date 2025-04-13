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
  products! : Array<any>;
  constructor() { }
  ngOnInit(): void {
    this.products = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
      { id: 4, name: 'Product 4', price: 400 },
      { id: 5, name: 'Product 5', price: 500 }
    ];
  }
  handleDeleteProduct(product: any) {
   let index = this.products.indexOf(product);
   this.products.splice(index, 1);
  }
}
