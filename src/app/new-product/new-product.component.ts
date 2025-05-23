import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit {
  productFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, public prodService: ProductService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion: this.fb.control(false, [Validators.required])
    });
  }

  handleAddProduct() {
    let product = this.productFormGroup.value;
    this.prodService.addNewProduct(product).subscribe({
      next: (data) => {
        alert('Product added successfully');
        this.productFormGroup.reset();
      },
      error: (err) => {
        console.error('Error adding product:', err);

      }
    })
  }
}
