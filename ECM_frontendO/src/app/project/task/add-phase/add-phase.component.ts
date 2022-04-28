import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Phase } from 'src/app/models/project/phase';
@Component({
  selector: 'app-add-phase',
  templateUrl: './add-phase.component.html',
  styleUrls: ['./add-phase.component.css']
})
export class AddPhaseComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddPhaseComponent>) { }
  phase: Phase = new Phase();
  ngOnInit(): void {
  }
  NameControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  onNoClick(): void {
    this.dialogRef.close();
  }
}
