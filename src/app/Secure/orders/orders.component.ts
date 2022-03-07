import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/Services/PageServices/order.service';
import { ProductService } from 'src/app/Services/PageServices/product.service';
import { IOrder } from '../orders-history/order';
import { IOrderPostion, OrderPostion } from '../orders-history/orderPostion';
import { Category } from '../products/category';
import { Product } from '../products/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  productsOnOrder: OrderPostion[] = [];
  order: IOrder;
  listOfCategories: Category[] = [];

  listOfProducts: Product[];
  listOfProductsSorted: Product[];

  selectedProduct: number;
  selectedCategory: string;
  isCategorySelected: number;
  quantitySelected: number = 1;
  costOfOrder: number = 0;
  iOnOrder: number = 0;;
  constructor(
    private product: ProductService,
    private orders: OrderService
  ) { 

  }

  ngOnInit() {
    Promise.all([
    this.product.getIServerProducts().then( data => {
      this.listOfProducts = data;
      this.sortListOfProducts();
    }),
    this.product.getCategories().then(
      data => this.listOfCategories = data
    )
  ])
  }
  changeCategory(){
    this.selectedProduct = 0; 
    this.isCategorySelected = 1;
    console.log(this.selectedCategory);
    this.listOfProductsSorted = this.listOfProducts.filter(x => x.category == this.selectedCategory);
  }
  sortListOfProducts()
  {
    this.listOfProducts = this.listOfProducts.filter(x => x.isActive == 1);
  }
  addProduct() {
    console.log(this.listOfProducts)
    console.log(this.selectedProduct)

    if(!this.productsOnOrder.some(x => x.name == this.listOfProducts.find(x => x.id == this.selectedProduct).name)){
      var adding: OrderPostion = {
        order_id: this.iOnOrder,
        name: this.listOfProducts.find(x => x.id == this.selectedProduct).name,
        category: this.listOfProducts.find(x => x.id == this.selectedProduct).category,
        cost: this.listOfProducts.find(x => x.id == this.selectedProduct).price,
        quantity: this.quantitySelected
      }
      this.iOnOrder ++;
      console.log(adding);
      this.productsOnOrder.push(adding);
      this.updateCost();
    } else 
    {
      this.productsOnOrder.find(x => x.name == this.listOfProducts.find(x => x.id == this.selectedProduct).name).quantity += this.quantitySelected;
      this.updateCost();
    }
  }
  updateCost(){
    this.costOfOrder = 0;
    this.productsOnOrder.forEach(element => {
      this.costOfOrder += element.cost * element.quantity;
    });
  }
  deleteProduct(id: number) {
    console.log(id)
    this.productsOnOrder = this.productsOnOrder.filter(x => x.order_id != id);
    this.updateCost();
  }

  getNameOfSeller(){
    return localStorage.getItem('userName');
  }
  onSubmit() {
      var listOfProductsToSend : IOrderPostion[] = []
      this.productsOnOrder.forEach(element => {
        var adding : IOrderPostion = {
          id:0,
          order_id: 0,
          product_id: this.listOfProducts.find(x => x.name == element.name).id,
          quantity: element.quantity
        }
        listOfProductsToSend.push(adding);
      });
      console.log(listOfProductsToSend);
      this.orders.addOrder(listOfProductsToSend);
      this.productsOnOrder = [];
      this.updateCost();
  }

}
