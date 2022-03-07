import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/PageServices/order.service';
import { ProductService } from 'src/app/Services/PageServices/product.service';
import { IOrder } from '../orders-history/order';
import { IOrderPostion } from '../orders-history/orderPostion';
import { Category } from '../products/category';
import { Product } from '../products/product';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public listOrders: IOrder[];

  listOfCategories: Category[] = [];
  public listProductOrder: IOrderPostion[] = [];
  listProducts: Product[] = [];

  ordersGraph: StatisticsData[] = [];
  ordersGraphSorted: StatisticsData[] = [];

  categoryGraph: StatisticsData[] = [];
  categoryGraphSorted: StatisticsData[] = [];

  monthsOrdersGraph: StatisticsData[] = [];
  monthsOrdersGraphSorted: StatisticsData[] = [];
  
  monthsValueGraph: StatisticsData[] = [];
  monthsValueGraphSorted: StatisticsData[] = [];

  constructor(
    private ordersS: OrderService,
    private productS:ProductService
  ) {
    Promise.all([
    this.ordersS.getOrders().then(
      (data) => {
        this.listOrders = data
      }
    ),
    this.productS.getCategories().then(
      data => this.listOfCategories = data
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
    )
      
  ]).then( succ => {
    this.calcOrderGraph();
    console.log(this.ordersGraph);
    this.calcPieGraph();
    this.calcMonthsGraphs();

    this.categoryGraphSorted = [...this.categoryGraph];
    this.ordersGraphSorted = [...this.ordersGraph];
    this.monthsOrdersGraphSorted = [...this.monthsOrdersGraph];
    this.monthsValueGraphSorted = [...this.monthsValueGraph];
    //this.ordersGraphSorted = [...this.ordersGraph];
  })

   }


   axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }


  ngOnInit(): void {
    
  }
  calcPieGraph()
  {
    const oneMonthAgo = Date.now() - 86400000 * 30;
    this.listOfCategories.forEach(element => {
      var add : StatisticsData = 
      {
        name: element.category,
        value: 0
      }
      this.categoryGraph.push(add);
    });
    console.log(this.categoryGraph);
    this.listProductOrder.forEach(element => {
      if(oneMonthAgo <= new Date(this.listOrders.find(x => x.id == element.order_id).date).valueOf()) 
      {
        var product = this.categoryGraph.find(x => x.name == this.listProducts.find(x => x.id == element.product_id).category);
        product.value += element.quantity;
      }
    });
  }
  calcMonthsGraphs()
  {
    const oneMonthAgo = Date.now() - 86400000 * 30;
    var date:Date = new Date();

    for(let i = 0; i < 12; i++) {
      if((date.getMonth() - i) > -1){
        var add : StatisticsData = {
          name: (date.getFullYear()).toString() + "-" + (date.getMonth()+1 - i).toString(),
          value: 0,
        }
        var add2 : StatisticsData = {
          name: (date.getFullYear()).toString() + "-" + (date.getMonth()+1 - i).toString(),
          value: 0,
        }
        this.monthsOrdersGraph.push(add);
        this.monthsValueGraph.push(add2);
      } else {
        var add : StatisticsData = {
          name: (date.getFullYear() - 1).toString() + "-" + (12 - (date.getMonth()) - i).toString(),
          value: 0,
        }
        var add2 : StatisticsData = {
          name: (date.getFullYear() - 1).toString() + "-" + (12 - (date.getMonth()) - i).toString(),
          value: 0,
        }
        this.monthsOrdersGraph.push(add);
        this.monthsValueGraph.push(add2);
      }
    }
    this.listOrders.forEach(element => {
      var tDate = new Date(element.date).getMonth();
      if(this.monthsOrdersGraph.some(x => new Date(x.name).getMonth() == tDate))
      {
        this.monthsOrdersGraph.find(x => new Date(x.name).getMonth() == tDate).value ++;
        var productOnOrder = this.listProductOrder.filter(x => x.order_id == element.id);
        if(productOnOrder.length > 0)
        productOnOrder.forEach(element2 => {
          this.monthsValueGraph.find(x => new Date(x.name).getMonth() == tDate).value += element2.quantity * this.listProducts.find(x => x.id == element2.product_id).price;
        });
      }
    });
  }
  calcOrderGraph(){
    const oneMonthAgo = Date.now() - 86400000 * 30;
    var date:Date = new Date();
    for(let i = 0; i < 30; i++) {
      if((date.getDate() - i) > 0 ){
        var add : StatisticsData = {
          name: (date.getFullYear()).toString() + "-" + (date.getMonth()+1).toString() + "-" + (date.getDate() - i).toString(),
          value: 0,
        }
        this.ordersGraph.push(add)
      } else {
        var add : StatisticsData = {
          name: (date.getFullYear()).toString() + "-" + (date.getMonth()).toString() + "-" + (new Date(date.getFullYear(), date.getMonth(), 0).getDate() - (i - date.getDate()) ).toString(),
          value: 0,
        }
        this.ordersGraph.push(add)
      }
    }
    this.listOrders.forEach(element => {
      if(oneMonthAgo <= new Date(element.date).valueOf()){
        var eleDate: Date = new Date(element.date);
        if(this.ordersGraph.some(x => new Date(x.name).getFullYear() == eleDate.getFullYear() &&
        new Date(x.name).getMonth() == eleDate.getMonth() &&
        new Date(x.name).getDate() == eleDate.getDate()))
        {
        this.ordersGraph.find(x => new Date(x.name).getFullYear() == eleDate.getFullYear() &&
        new Date(x.name).getMonth() == eleDate.getMonth() &&
        new Date(x.name).getDate() == eleDate.getDate()
        ).value ++;
        }
      }
    });
  }
}

export interface StatisticsData {
  name: string;
  value: number;
}
export interface AdvStatisticData 
{
  name: string;
  series: StatisticsData[];
}