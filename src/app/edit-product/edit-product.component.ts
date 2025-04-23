import { Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  productId!: string;
  product! : Product;
  editProductFormGroup!: FormGroup;

  constructor(private route : ActivatedRoute, public prodService: ProductService,
    private fb: FormBuilder) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.prodService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.editProductFormGroup = this.fb.group({
          name: this.fb.control(product.name, [Validators.required, Validators.minLength(4)]),
          price: this.fb.control(product.price, [Validators.required, Validators.min(200)]),
          promotion: this.fb.control(product.promotion, [Validators.required])
        });
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  handleEditProduct() {
    let product = this.editProductFormGroup.value;
    this.prodService.updateProduct(this.productId, product).subscribe({
      next: (data) => {
        alert('Product updated successfully');
        this.editProductFormGroup.reset();
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }
}