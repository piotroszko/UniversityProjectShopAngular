import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/Services/PageServices/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private admin: AdminService
    ) {}
  
  public roleSelected: string;
  public form = 
  {
    name: null,
    email: null,
    password: null,
    repeat_password:null,
    role: null
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addUser(){
    console.log(this.form)
    this.admin.addUser(this.form.name, this.form.email, this.form.password, this.form.repeat_password, this.roleSelected);
  }

  ngOnInit(): void {
  }

}
