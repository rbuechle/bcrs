import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: any;


  constructor(private http: HttpClient) {
    this.http.get('api/session/register').subscribe(res => {
      this.users = res;
      console.log(this.users);
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {}
}
