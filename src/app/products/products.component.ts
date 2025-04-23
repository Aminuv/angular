import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction : string="all";
  
  constructor(private productService: ProductService, private fb: FormBuilder,
    public authService: AuthenticationService, private router: Router
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    this.handleGetPageProducts();
  }

  handleGetPageProducts() {
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    }); 
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    }); 
  }

  handleDeleteProduct(product: Product) {
    let confirmation = confirm("Are you sure you want to delete this product?");
    if(!confirmation) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        let index = this.products.indexOf(product);
        this.products.splice(index, 1);
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleSetPromotion(product: Product) {
    let promo = product.promotion;
    this.productService.setPromotion(product.id).subscribe({
      next: (data) => {
        product.promotion = !promo;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleSearchProduct() {
    this.currentAction="search";
    this.currentPage=0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  gotoPage(i: number) {
    this.currentPage = i;
    if(this.currentAction==='all')
      this.handleGetPageProducts()
    else
    this.handleSearchProduct();
      
  }

  handleNewProduct() {
    this.router.navigate(['/admin/new-product']);
  }

  public addNewProduct(product: Product) : Observable<Product> {
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  handleEditProduct(product: Product) {
    this.router.navigate(['/admin/edit-product', product.id]);
  }
}
