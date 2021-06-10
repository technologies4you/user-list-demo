import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Telephone } from '../shared/models/telephone.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  dialogTitle: string;
  dialogText: string;
  user: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    telephone: new Telephone('', '', ''),
  };

  @Output() submitClicked = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(new Telephone('', '', '')),
  });

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    if (this.data.user) {
      this.firstNameControl?.setValue(this.data.user.firstName);
      this.lastNameControl?.setValue(this.data.user.lastName);
      this.emailControl?.setValue(this.data.user.email);
      this.telephoneControl?.setValue(this.data.user.telephone);
    }
  }

  get firstNameControl() {
    return this.userForm.get('firstName');
  }

  get lastNameControl() {
    return this.userForm.get('lastName');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get telephoneControl() {
    return this.userForm.get('telephone');
  }

  onSubmit() {
    this.submitClicked.emit({
      id: null,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      telephone: this.userForm.value.telephone,
    });
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
