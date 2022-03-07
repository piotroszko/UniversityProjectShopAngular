import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IOrderPostion, OrderPostion } from './orderPostion';
import {ItemsTableComponent} from './items-table/items-table.component';
import { IOrder, Order } from './order';
import { OrderService } from 'src/app/Services/PageServices/order.service';
import { ProductService } from 'src/app/Services/PageServices/product.service';
import { Product } from '../products/product';
import { ChangeDetectorRef } from '@angular/core';
import { Seller } from './seller';
import { identifierModuleUrl } from '@angular/compiler';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersHistoryComponent implements OnInit {
  public listOrders: IOrder[];
  public listProductOrder: IOrderPostion[];
  listProducts: Product[];
  sellerList: Seller[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ordersS: OrderService,
    private productS: ProductService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.getTable();
  }
  getTable() 
  {
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
      this.ordersS.getSellers().then(
        (data) => {
          this.sellerList = data
        }
      )
    ]).then( res => {
      this.clearEmptyEntries();
      this.addOrders();
      this.addProductOrders();
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = [...this.dataSource.data.sort(function(a, b){
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      })]
    });
  }
  public filterInput: string;
  public doFilter() {
    this.dataSource.filter = this.filterInput.trim().toLocaleLowerCase();
    this.dataSource.data = [...this.dataSource.data.sort(function(a, b){
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    })]
  }
  clearEmptyEntries(){
    var cleared: IOrderPostion[] = [];
    for(var i:number = 0; i < this.listProductOrder.length; i++){
      if(this.listProducts.some(x => x.id == this.listProductOrder[i].product_id)) 
      {
        cleared.push(this.listProductOrder[i]);
      }
    }
    for(var i:number = 0; i < this.listOrders.length; i++){
      if(!this.sellerList.some(x => x.id == this.listOrders[i].seller)) 
      {
        var newSeller: Seller = {
          name: "Nieznany",
          id: this.listOrders[i].seller
        };
        this.sellerList.push(newSeller);
      }
    }
    this.listProductOrder = [...cleared];
    console.log(this.listProductOrder);
  }
  addOrders(){
    this.listOrders.forEach(element => {
      var test: Order = {
        id:element.id,
        seller: this.sellerList.find(x => x.id == element.seller).name,
        date: element.date
      };
      this.ORDERS_DATA.push(
        test
      );
    });
    this.dataSource.data = [];
    this.dataSource.data = this.ORDERS_DATA;
  }
  addProductOrders() {
    this.listProductOrder.forEach(element => {
      var test: OrderPostion = {
        order_id:element.order_id,
        name: this.listProducts.find(x => x.id == element.product_id).name,
        category: this.listProducts.find(x => x.id == element.product_id).category,
        cost: this.listProducts.find(x => x.id == element.product_id).price,
        quantity: element.quantity
      }
      this.POSITION_DATA.push(test);
    });
    this.orderData = [];
    this.orderData = this.POSITION_DATA;
  }
  POSITION_DATA: OrderPostion[] = [
  ];
  ORDERS_DATA: Order[] = [
  ];
  dataSource = new MatTableDataSource(this.ORDERS_DATA);
  orderData = this.POSITION_DATA;
  columnsToDisplay = ['id', 'seller', 'date', 'action'];
  expandedElement: Order | null;
  open(id: number) {
    const modalRef = this.modalService.open(ConfirmDeleteComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then( (data) => {
      if(data != 'Close') {
        const numberId: number = data;
        this.ordersS.deleteOrder(data).then( (data) => {
          console.log("Test1");
          this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => x.id != numberId));
          this.dataSource.data = [...this.dataSource.data.sort(function(a, b){
            return new Date(b.date).valueOf() - new Date(a.date).valueOf();
          })]
        });
        //then this.getTable();
      }
    });
  }
}
