import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/Secure/products/product';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Secure/products/category';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://127.0.0.1:8000/api";
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, notifierService: NotifierService) { 
    this.notifier = notifierService;
  }
  
  getProducts(){
    return this.http.get(`${this.baseUrl}/show/`, { withCredentials: true });
  }
  public getIServerProducts(): Promise<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/show/`, { withCredentials: true }).toPromise();
  }
  public getCategories(): Promise<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}/showUniqueCategory/`, { withCredentials: true }).toPromise();
  }
  updateProduct(id: number, name:string, category: string, price:number){
    this.deleteProductWithoutNotification(id);
     this.http.post(`${this.baseUrl}/add/`, { "add_name": name, "add_category": category, "add_price": price}, { withCredentials: true })
    .subscribe(
      succ => {console.log(succ)
       this.notifier.notify('success', 'Zedytowano produkt pomyślnie');
     },
      error => {console.log(error)
       this.notifier.notify('error', 'Nieudało sie zedytować produktu');
     });
  }
  addProduct(name:string, category: string, price: number){
    this.http.post(`${this.baseUrl}/add/`, { "add_name": name, "add_category": category, "add_price": price}, { withCredentials: true })
    .subscribe(
      succ => {console.log(succ)
       this.notifier.notify('success', 'Dodano nowy produkt');
     },
      error => {console.log(error)
       this.notifier.notify('error', 'Nieudało sie dodać nowego produktu');
     });
  }
  /*updateProduct() {
    return this.http.post(`${this.baseUrl}/update/`, data, { withCredentials: true });
  }*/
  deleteProduct(id: number){
    return this.http.post(`${this.baseUrl}/deactiveProduct/`, {"id":`${id}`}, { withCredentials: true })
    .subscribe(
      succ => {console.log(succ)
       this.notifier.notify('success', 'Usunięto produkt');
     },
      error => {console.log(error)
       this.notifier.notify('error', 'Nieudało sie usunąć produktu');
     });
  }
  deleteProductWithoutNotification(id: number){
    return this.http.post(`${this.baseUrl}/deactiveProduct/`, {"id":`${id}`}, { withCredentials: true })
    .subscribe(
      succ => {console.log(succ)
     },
      error => {console.log(error)
     });
  }
}
