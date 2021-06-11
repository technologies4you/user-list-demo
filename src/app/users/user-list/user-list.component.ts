import { AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
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

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.userService.getUsers().toPromise();
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
            async () => {
              this.openSnackBar('Successfully added user!');
              await this.updateTable();
            },
            () => {
              this.openSnackBar(
                'Failed to add user.  Please try again, or contact your administrator if the issue persists.'
              );
            }
          );
      }
    );
  }

  openEditUserDialog(user: any) {
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
            async () => {
              this.openSnackBar('Successfully updated user!');
              await this.updateTable();
            },
            () => {
              this.openSnackBar(
                'Failed to udpate user.  Please try again, or contact your administrator if the issue persists.'
              );
            }
          );
      }
    );
  }

  async deleteUser(user: User) {
    await this.userService
      .deleteUser(user.id as number)
      .toPromise()
      .then(
        async () => {
          this.openSnackBar('Successfully deleted user!');
          await this.updateTable();
        },
        () => {
          this.openSnackBar(
            'Failed to delete user.  Please try again, or contact your administrator if the issue persists.'
          );
        }
      );
  }

  private async updateTable() {
    this.dataSource.data = await this.userService.getUsers().toPromise();
    this.changeDetectorRef.detectChanges();
  }

  openSnackBar(data?: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      data,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
