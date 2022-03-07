import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/PageServices/product.service';
import { Category } from '../category';
import { Product } from '../product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() editID: number
  @Output() viewValue = new EventEmitter<void>();
  listOfCategories: Category[] = [];
  productEdit: Product;
  constructor(
    private products: ProductService
  ) { }
  public form = 
  {
    name: null,
    category: null,
    price: null
  }

  ngOnInit(): void {
    this.products.getCategories().then(
      data => this.listOfCategories = data
    );
    this.products.getIServerProducts().then(data => {this.form = data.find(x => x.id == this.editID) });
  }
  submitEdit(){
    this.products.updateProduct(this.editID, this.form.name, this.form.category, this.form.price);
    setTimeout( () => {this.viewValue.emit();}, 500 );
  }

}
