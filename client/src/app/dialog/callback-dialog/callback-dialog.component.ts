import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-callback-dialog',
  templateUrl: './callback-dialog.component.html',
  styleUrls: ['./callback-dialog.component.scss']
})
export class CallbackDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CallbackDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close()
  }
}
