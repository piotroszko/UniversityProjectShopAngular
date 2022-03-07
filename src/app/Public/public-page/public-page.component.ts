import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css']
})
export class PublicPageComponent implements OnInit {
  forgotPassword = true;
  loginForm: FormGroup;
  emailForm: FormGroup;
  
  public formReset = {
    email: null
  }
  initForms(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    this.emailForm = this.fb.group({
      email: ['',[Validators.required, Validators.email, Validators.minLength(4)]]
    })
  }



  onSubmit() 
  {
    var loginData: any = new FormData();
    loginData.append("email", this.loginForm.get('email').value);
    loginData.append("password", this.loginForm.get('password').value);
    this.user.login(loginData);
  }
  sendEmail() {
    this.http.post('http://127.0.0.1:8000/api/reset', { "email" : this.formReset.email}).subscribe( 
      () => this.forgotPassword = !this.forgotPassword
      
      )
  }

  constructor(
    private user: UserService,
    private http: HttpClient,
    public fb: FormBuilder
    ) {
      this.initForms();
     }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.documentElement.classList.add("login-page1");
    document.documentElement.classList.add("h-100");
    document.body.classList.add("h-100");
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove("login-page1");
    document.documentElement.classList.remove("h-100");
    document.body.classList.remove("h-100");
  }

}
