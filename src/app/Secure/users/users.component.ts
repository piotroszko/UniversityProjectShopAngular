import { ChangeDetectorRef } from '@angular/core';
import {Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/PageServices/admin.service';
import { User } from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  rowEdit: number = 0;
  public usersList: User[];
  constructor(private admin: AdminService
    ) { 

    }
  public form = {
    name:null,
    email:null,
    role: null
  }
  ngOnInit(): void {
    this.admin.getUsers().then(
      (data) => {
        this.usersList = data;
        console.log(this.usersList)
      }
    )
  }
  updateUsers(){
    this.admin.getUsers().then(
      (data) => {
        this.usersList = data;
        console.log(this.usersList)
      }
    )
  }
  rowEditChange(e: Event,id: number) {
    e.preventDefault();
    this.form.name = this.usersList.find(x => x.id == id).name;
    this.form.email = this.usersList.find(x => x.id == id).email;
    this.form.role = this.usersList.find(x => x.id == id).usertype;
    if (this.rowEdit == 0) {
      this.rowEdit = id;
    }
  }
  closeRowEdit(e: Event){
    e.preventDefault();
    if (this.rowEdit != 0) {
      this.rowEdit = 0;
    }
  }
  editRow(e: Event ,id: number){
    e.preventDefault();
    this.admin.updateUser(this.form.name, this.form.email, this.form.role, id);
    setTimeout( () => { this.updateUsers()}, 300);
    this.rowEdit = 0;
  }
  isEditAdmin(id: number){
    if(this.usersList.find(x => x.id == id).usertype = "admin") {
      return true;
    } else {
      return false;
    }
  }
  deleteUser(e: Event ,id: number){
    e.preventDefault();
    this.admin.deleteUser(id);
    setTimeout( () => { this.updateUsers()}, 300);
  }
}