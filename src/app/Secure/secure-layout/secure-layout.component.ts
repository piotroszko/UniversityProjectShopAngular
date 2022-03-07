import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-secure-layout',
  templateUrl: './secure-layout.component.html',
  styleUrls: ['./secure-layout.component.css']
})
export class SecureLayoutComponent implements OnInit {
  isSidebarActive: boolean = false;

  constructor(private user: UserService,
    private router: Router) { }
  getUserName(){
    return this.user.getLocalUser().userName;
  }
  getUserRole(){
    return this.user.getLocalUser().userType;
  }
  logoutSubmit() {
    this.user.logout();
    this.router.navigate(['/login']);
  }
  changeSideBar(){
    if(this.isSidebarActive == false){
      document.getElementById('main-wrapperr').classList.add("menu-toggle");
      this.isSidebarActive = true;
    } else {
      document.getElementById('main-wrapperr').classList.remove("menu-toggle");
      this.isSidebarActive = false;
    }
  }

  ngOnInit(): void {
    
  }
  
}
