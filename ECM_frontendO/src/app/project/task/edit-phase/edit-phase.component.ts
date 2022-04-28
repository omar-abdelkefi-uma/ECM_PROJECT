import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Phase } from 'src/app/models/project/phase';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  microse: Phase
}
@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.css']
})
export class EditPhaseComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditPhaseComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  phase: Phase = new Phase();
  ngOnInit(): void {
    this.phase = this.data.microse;
  }
  NameControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  onNoClick(): void {
    this.dialogRef.close();
  }
}
