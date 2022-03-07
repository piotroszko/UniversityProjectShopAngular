import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/Secure/orders-history/order';
import { IOrderPostion } from 'src/app/Secure/orders-history/orderPostion';
import { Seller } from 'src/app/Secure/orders-history/seller';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly notifier: NotifierService;
  private baseUrl = "http://127.0.0.1:8000/api";

  constructor(
    private http: HttpClient,
    notifierService: NotifierService
    ) {
      this.notifier = notifierService;
     }

  getOrders(): Promise<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}/ordersShow/`, { withCredentials: true }).toPromise();
  }
  getProductsOrders(): Promise<IOrderPostion[]>{
    return this.http.get<IOrderPostion[]>(`${this.baseUrl}/p_oShow/`, { withCredentials: true }).toPromise();
  }
  getSellers(): Promise<Seller[]>
  {
    return this.http.get<Seller[]>(`${this.baseUrl}/showByUser/`, { withCredentials: true }).toPromise();
  }
  addOrder(products: IOrderPostion[])
  {
    return this.http.post(`${this.baseUrl}/ordersAdd/`, {id:1} ,{ withCredentials: true }).toPromise()
    .then(
      (data) => {
        console.log(data)
        this.http.get<IOrder>(`${this.baseUrl}/ordersCurrent/` ,{ withCredentials: true }).toPromise()
        .then(
          (data2) => {
            console.log(data2)
            var sellerId = data2.id;
            var request = "[";
            products.forEach(element => {
              request += `{"add_order":${sellerId},"add_product":${element.product_id},"add_quantity":${element.quantity}},`
            });
            request = request.slice(0, -1);
            request += "]";
            console.log("Request wyglada tak:")
            console.log(request)
            this.http.post(`${this.baseUrl}/p_oAdd/`, request ,{ withCredentials: true }).toPromise().then(
            (data3) => {
              console.log(data3)
              this.notifier.notify('success', 'Dodano zamówienie');
            }
            )
          }
        )
      }
      )
  }
  deleteOrder(id: number) 
  {//ordersDelete
    return this.http.post(`${this.baseUrl}/ordersDelete/`, {id:id} ,{ withCredentials: true }).toPromise()
    .then((data) => {
      let listProductOrder: IOrderPostion[];
      this.getProductsOrders().then(
        (data) => {
          listProductOrder = data
          listProductOrder.forEach(element => {
            if(element.order_id == id) 
            {
              this.http.post(`${this.baseUrl}/p_oDelete`, {id:element.id} ,{ withCredentials: true }).toPromise().then(
                (data) => {
                  console.log(data)
                }
              )
            }
          });
        this.notifier.notify('success', 'Usunieto zamówienie!');
        }
        
      )
    })
  }

}
