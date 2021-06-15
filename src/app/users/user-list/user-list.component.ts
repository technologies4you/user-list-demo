import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Subject,
  Subscription,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../shared/models/user.model';
import { UserService } from '../services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { SnackBarComponent } from '../shared/helpers/snackbar/snack-bar.component';

import { FIRST_NAMES } from './../mock-data/first-names';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  /* Angular Material setup */
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'telephone',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  firstNames = FIRST_NAMES;

  /* declaritive assignments */
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private userFirstNameSubject = new BehaviorSubject<string>('');
  userFirstNameAction$ = this.userFirstNameSubject.asObservable();

  users$ = combineLatest([
    this.userService.UsersWithAdd$,
    this.userFirstNameAction$,
  ]).pipe(
    map(
      ([users, selectedFirstName]) => {
        return users.filter((user) =>
          selectedFirstName ? user.firstName === selectedFirstName : true
        );
      },
      catchError((err) => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    ),
    map((users) => (this.dataSource.data = users))
  );

  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.userSubscription = this.users$.subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserEditComponent, {
      restoreFocus: false,
      width: '400px',
      data: {
        dialogTitle: 'Add User',
      },
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      async (newUser: User) => {
        await this.userService
          .createUser(newUser)
          .toPromise()
          .then(
            async () => this.openSnackBar('Successfully added user!'),
            () =>
              this.openSnackBar(
                'Failed to add user.  Please try again, or contact your administrator if the issue persists.'
              )
          );
      }
    );
  }

  openEditUserDialog(user: any) {
    this.userService.selectedUserChanged(user.id);

    const dialogRef = this.dialog.open(UserEditComponent, {
      restoreFocus: false,
      width: '400px',
      data: {
        dialogTitle: 'Edit User',
        user,
      },
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      async (updatedUser: User) => {
        await this.userService
          .updateUser(updatedUser)
          .toPromise()
          .then(
            () => this.openSnackBar('Successfully updated user!'),
            () =>
              this.openSnackBar(
                'Failed to udpate user.  Please try again, or contact your administrator if the issue persists.'
              )
          );
      }
    );
  }

  async deleteUser(user: User) {
    await this.userService
      .deleteUser(user.id as number)
      .toPromise()
      .then(
        async () => this.openSnackBar('Successfully deleted user!'),
        () =>
          this.openSnackBar(
            'Failed to delete user.  Please try again, or contact your administrator if the issue persists.'
          )
      );
  }

  openSnackBar(data?: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      data,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onSelected(firstName: string) {
    this.userFirstNameSubject.next(firstName);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
