import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/PageServices/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  ProductsView:number = 0;
  ProductEdit:number = 0;

  productsList: Observable<any>;

  constructor(private products: ProductService) {
  }

  ngOnInit(): void {
    this.productsList = this.products.getProducts()
    this.filterDeactivedProducts() ;
  }
  filterDeactivedProducts() 
  {
    
  }
  deleteProduct(e:Event, id: number) {
    e.preventDefault();
    console.log("delete:"+id);
    this.products.deleteProduct(id);
    setTimeout( () => {this.productsList = this.products.getProducts();}, 500 );
  }
  editProduct(e: Event, id:number){
    e.preventDefault();
    this.ProductEdit = id;
    this.ProductsView = 1;
  }
  changeViewBack() 
  {
    this.ProductsView = 0;
  }

}