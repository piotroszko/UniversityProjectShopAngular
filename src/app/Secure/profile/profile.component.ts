import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: any = {
    name:null,
    userType:null,
    email: null,
    creationDate: null
  }
  public form = 
  {
    old_password: null,
    new_password: null,
    confirm_password: null
  }
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getUser().subscribe(
      (result: any) => { 
        console.log(result);
        this.userInfo.name = result.name;
        this.userInfo.usertype = result.usertype;
        this.userInfo.email = result.email;
        this.userInfo.creationDate = result.created_at;
    },
      error => {
        console.log(error);
      }
    );
  }
  changePassword(){
    this.user.setNewPassword(this.form.old_password, this.form.new_password, this.form.confirm_password);
  }
  checkRole(){
    if(localStorage.getItem('userType') == 'admin') {
      return "Admin";
    } else {
      return "Pracownik";
    }
  }

}
