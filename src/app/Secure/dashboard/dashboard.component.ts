import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component} from '@angular/core';
import { OrderService } from 'src/app/Services/PageServices/order.service';
import { ProductService } from 'src/app/Services/PageServices/product.service';
import { IOrder } from '../orders-history/order';
import { IOrderPostion } from '../orders-history/orderPostion';
import { Category } from '../products/category';
import { Product } from '../products/product';
import { ProductData } from './data';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent {
  public listOrders: IOrder[];
  public listProductOrder: IOrderPostion[];
  listProducts: Product[];
  listOfCategories: Category[] = [];

  valueSoldTodayNumber: number = 0;
  valueSoldMonthNumber: number = 0;
  amountSoldTodayNumber: number = 0;
  amountSoldMonthNumber: number = 0;

  amountSelectedDays: string = "30days";
  amountSelectedCategory: string = "all";
  valueSelectedDays: string = "30days";
  valueSelectedCategory: string = "all";


  amountSold: ProductData[] = [];
  valueSold: ProductData[] = [];

  amountSoldSorted: ProductData[] = [];
  valueSoldSorted: ProductData[] = [];

  myDate:string;

  view: any[] = [700, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Produkty';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Ilość';
  xAxisLabel2: string = 'Łączna wartość';

  constructor(
    private ordersS: OrderService,
    private productS: ProductService,
  ) {
    Promise.all([
      this.ordersS.getOrders().then(
        (data) => {
          this.listOrders = data
        }
      ),
      this.ordersS.getProductsOrders().then(
        (data) => {
          this.listProductOrder = data
        }
      ),
      this.productS.getIServerProducts().then(
        (data) => {
          this.listProducts = data
        }
      ),
      this.productS.getCategories().then(
        data => this.listOfCategories = data
      )
    ]).then( res => {
      this.calcBasicNumbers();
      console.log(this.listOfCategories);
      this.sortGrahps();
    });
  }
  calcBasicNumbers(){
    const oneDayAgo = Date.now() - 86400000 / 2;
    const oneMonthAgo = Date.now() - 86400000 * 30;
    this.listProductOrder.forEach(element => {
      if (oneDayAgo <= new Date(this.listOrders.find(x => x.id == element.order_id).date).valueOf()){
        this.amountSoldTodayNumber += element.quantity;
        this.valueSoldTodayNumber += this.listProducts.find(x => x.id == element.product_id).price * element.quantity;
      } 
      if(oneMonthAgo <= new Date(this.listOrders.find(x => x.id == element.order_id).date).valueOf()) {
        this.amountSoldMonthNumber += element.quantity;
        this.valueSoldMonthNumber += this.listProducts.find(x => x.id == element.product_id).price * element.quantity;
      }
    });
  }
  selectHandlerDateValue(e: any){
    console.log(e.target.value);
    this.valueSelectedDays = e.target.value;
  }
  selectHandlerDateAmount(e: any){
    console.log(e.target.value);
    this.amountSelectedDays = e.target.value;
  }
  selectHandlerCategoryValue(e: any){
    console.log(e.target.value);
    this.valueSelectedCategory = e.target.value;
  }
  selectHandlerCategoryAmount(e: any){
    console.log(e.target.value);
    this.amountSelectedCategory = e.target.value;
  }
  getDate(s: string){
    const oneDay = 86400000;
    if(s == "all"){
      return 0;
    } else if (s == "today") {
      return Date.now() - oneDay;
    } else if (s == "30days") {
      return Date.now() - oneDay * 30;
    }else if (s == "6months") {
      return Date.now() - oneDay * 30 * 6;
    } else if (s == "year") {
      return Date.now() - oneDay * 30 * 12;
    } else {
      return 0;
    }
  }
  sortGrahps(){
    const oneMonthAgo = Date.now() - 86400000 * 30;
    this.listProductOrder.forEach(element => {
      if(oneMonthAgo <= new Date(this.listOrders.find(x => x.id == element.order_id).date).valueOf())
      {
        if(!this.amountSold.find(x => x.name == this.listProducts.find(y => y.id == element.product_id).name))
        { // jezeli nie ma pozycji
          var adding: ProductData = {
            name: this.listProducts.find(y => y.id == element.product_id).name,
            value: element.quantity,
            category: this.listProducts.find(y => y.id == element.product_id).category
          }
          this.amountSold.push(adding);
        }else { // jezeli jest
          this.amountSold.find(x => x.name == this.listProducts.find(y => y.id == element.product_id).name).value += element.quantity;
        }
        if(!this.valueSold.find(x => x.name == this.listProducts.find(y => y.id == element.product_id).name))
        {// jezeli nie ma pozycji
          var adding: ProductData = {
            name: this.listProducts.find(y => y.id == element.product_id).name,
            value: element.quantity * this.listProducts.find(y => y.id == element.product_id).price,
            category: this.listProducts.find(y => y.id == element.product_id).category
          }
          this.valueSold.push(adding);
        } else {// jezeli jest
          this.amountSold.find(x => x.name == this.listProducts.find(y => y.id == element.product_id).name).value += element.quantity * this.listProducts.find(y => y.id == element.product_id).price ;

        }
      }
    });
    this.amountSoldSorted = [...this.amountSold];
    this.valueSoldSorted = [...this.valueSold];
    
  }

  sortAmountSold(){
  }
}
