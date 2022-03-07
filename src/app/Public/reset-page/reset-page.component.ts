import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private route:ActivatedRoute,
    private router: Router
  ) { }
  public form = 
  {
    password: null,
    confirm_password: null
  }
  onSubmit(){
    const data = {
      "token": this.route.snapshot.params.token,
      "password": this.form.password,
      "password_confirm": this.form.confirm_password
    }
    console.log(data)
    this.http.post('http://127.0.0.1:8000/api/reset', data).subscribe( () => this.router.navigate(['/login']));
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
