import {EventEmitter, Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/PageServices/product.service';
import { Category } from '../category';
import { Product } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Output() viewValue = new EventEmitter<void>();

  productsList: Observable<any>;
  listOfCategories: Category[] = [];

  constructor(private products: ProductService) { 

  }
  public form = 
  {
    name: null,
    category: null,
    price: null
  }
  addProduct()
  {
    this.products.addProduct(this.form.name, this.form.category, this.form.price);
    setTimeout( () => {this.viewValue.emit();}, 500 );
  }

  ngOnInit(): void {
    this.productsList = this.products.getProducts();
    this.products.getCategories().then(
      data => this.listOfCategories = data
    );
  }
}
