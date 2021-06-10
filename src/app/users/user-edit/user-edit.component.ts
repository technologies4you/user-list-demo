import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Telephone } from '../shared/models/telephone.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  dialogTitle: string;
  dialogText: string;

  @Output() submitClicked = new EventEmitter<any>();

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephone: new FormControl(new Telephone('', '', '')),
    email: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    console.log(this.data);
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get telephone() {
    return this.userForm.get('telephone');
  }

  get email() {
    return this.userForm.get('email');
  }

  onSubmit() {
    const data = 'Your data';
    this.submitClicked.emit(data);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
