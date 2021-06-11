import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { TelephoneInput } from './shared/helpers/telephone-input/telephone-input';
import { SnackBarComponent } from './shared/helpers/snackbar/snack-bar.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    TelephoneInput,
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
