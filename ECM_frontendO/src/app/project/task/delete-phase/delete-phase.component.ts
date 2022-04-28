import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Phase } from 'src/app/models/project/phase';
export interface DialogData {
  microse: Phase
}
@Component({
  selector: 'app-delete-phase',
  templateUrl: './delete-phase.component.html',
  styleUrls: ['./delete-phase.component.css']
})
export class DeletePhaseComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeletePhaseComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  phase: Phase = new Phase();
  ngOnInit(): void {
    this.phase = this.data.microse;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
