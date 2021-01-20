/*
============================================
; Title:  user-details.component.ts
; Author: Professor Krasso
; Date:   3 December 2019
; Description: Angular component for viewing a users details
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient) {
    this.http.get('/api/users/:userId').subscribe(res => {
      this.users = res;
      console.log(this.users)
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }


}
