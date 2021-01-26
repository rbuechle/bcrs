/*
============================================
; Title:  security-question-details.component.ts
; Author: Professor Krasso
; Date:   17 January 2021
; Modified By: Becca Buechle, Rochelle Markham, Rhonda Rivas, King Major
; Description: Angular component for viewing a security question
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: any;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    this.http.get('/api/security-questions/' + this.questionId).subscribe(res => {
      this.question = res;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.text.setValue(this.question.text);
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion() {
    this.http.put('/api/security-questions/' + this.questionId, {
      text: this.form.controls.text.value,
    }).subscribe(res => {
      this.router.navigate(['/security-questions']);
    });
  }

  cancel() {
    this.router.navigate(['/security-questions']);
  }
}
