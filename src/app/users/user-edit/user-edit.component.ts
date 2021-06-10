import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  dialogTitle: string;
  dialogText: string;

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    console.log(this.data);
  }

  submit() {
    const data = 'Your data';
    this.submitClicked.emit(data);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
