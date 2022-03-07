import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly notifier: NotifierService;

  private baseUrl = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient,
              private cookies: CookieService,
              notifierService: NotifierService,
              private router: Router
    ) 
    {
      this.notifier = notifierService;
     }
  isAdmin() {
    if (localStorage.getItem('userType') == "admin") {
      return true;
    } else {
      return false;
    }
  }
  isValid(){
    console.log('valid');
    if(document.cookie.split('; ').find(row => row.startsWith('jwt='))) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    localStorage.removeItem('userID');
    localStorage.removeItem('jwt');
    this.cookies.delete('jwt');
  }

  login(data) 
  {
    return this.http.post(`${this.baseUrl}/login/`, data).subscribe(
      (result: any) => { 
        this.setCookie(result.jwt);
        localStorage.setItem('jwt', result.jwt);
        this.saveUser();
        console.log('succes login');
        this.notifier.notify('success', 'Poprawnie zalogowano!');
        this.router.navigate(['/']);
    },
      error => {
        if(error.status == 401) {
          
        }
        this.notifier.notify('error', 'Podano błędne dane!');
        console.log(error.error);
      }
    );
  }
  getUser()
  {
    const headers = new HttpHeaders({
      'Cookie' : `jwt=${localStorage.getItem('jwt')}`
    });
    return this.http.get(`${this.baseUrl}/user/`, { withCredentials: true });
  }
  setCookie(jwt: string) {
    this.cookies.set('jwt', jwt);
  }
  getCookie() {
    return this.cookies.get('jwt');
  }
  setNewPassword(old_password: string, new_password: string, repeat_password: string) {
    return this.http.post(`${this.baseUrl}/login/`, {"old_password": old_password, "new_password": new_password, "confirm_password": repeat_password}, { withCredentials: true })
  }
  saveUser(){
    this.getUser().subscribe(
      (result: any) => { 
        console.log('succes');
        localStorage.setItem('userName', result.name);
        localStorage.setItem('userEmail', result.email);
        localStorage.setItem('userType', result.usertype);
        localStorage.setItem('userID', result.id);
    },
      error => {
        console.log('error');
        console.log(error);
      }
    );
  }
  getLocalUser(){
    return { userName: localStorage.getItem('userName'),
             userEmail: localStorage.getItem('userEmail'),
             userType: localStorage.getItem('userType'),
             userID: localStorage.getItem('userID')          
  }
  }
}
