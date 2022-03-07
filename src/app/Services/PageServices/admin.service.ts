import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/Secure/users/users';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
private baseUrl = "http://127.0.0.1:8000/api";
private readonly notifier: NotifierService;

constructor(private http: HttpClient, notifierService: NotifierService) { 
  this.notifier = notifierService;
}

getUsers(): Promise<User[]>{
  return this.http.get<User[]>(`${this.baseUrl}/admin/`, { withCredentials: true }).toPromise();
}
addUser(name: string, email: string, password: string, password_confirm: string, usertype: string) {
  return this.http.post(`${this.baseUrl}/register/`, {"name":name, "email": email, "password":password, "password_confirm":password_confirm, "usertype":usertype}, { withCredentials: true })
  .subscribe(
   succ => {console.log(succ)
    this.notifier.notify('success', 'Dodano nowego użytkownika');
  },
   error => {console.log(error)
    this.notifier.notify('error', 'Nieudało sie dodać nowego użytkownika');
  });
}
updateUser(name: string, email: string, usertype: string, id: number) {
  this.http.post(`${this.baseUrl}/updateUser/`+id, {"name":name, "email": email, "usertype": usertype}, { withCredentials: true })
  .subscribe( succ => {console.log(succ)
    this.notifier.notify('success', 'Zedytowano użytkownika');
  }, 
  error => {console.log(error)
    this.notifier.notify('error', 'Nieudało sie zedytować użytkownika');
  });
}
deleteUser(id: number){
  this.http.post(`${this.baseUrl}/deleteUser/`, {"id":id}, { withCredentials: true })
  .subscribe( succ => {console.log(succ)
    this.notifier.notify('success', 'Usunięto użytkownika');
  },
  error => {console.log(error)
    this.notifier.notify('success', 'Nieudało sie usunąć użytkownika');
  });
}

}