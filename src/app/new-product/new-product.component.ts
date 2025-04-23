import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit {
  productFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null, [Validators.required,]),
      promotion: this.fb.control(false, [Validators.required])
    });
  }

  handleAddProduct() {
    console.log(this.productFormGroup.value);
  }

}
