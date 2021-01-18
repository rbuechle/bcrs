/*
============================================
; Title:  security-question-delete-dialog-component.ts
; Author: Professor Krasso
; Date:   19 January 2021
; Modified by: Becca Buechle, Rhonda Rivas, Rochelle Markham, King Major
; Description: Material dialog for deleting security questions.
;===========================================
*/

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-security-question-delete-dialog',
  templateUrl: './security-question-delete-dialog.component.html',
  styleUrls: ['./security-question-delete-dialog.component.css']
})
export class SecurityQuestionDeleteDialogComponent implements OnInit {
  questionId: string;

  constructor(private dialogRef: MatDialogRef<SecurityQuestionDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.questionId = data.questionId;
  }

  ngOnInit() {
  }
}
