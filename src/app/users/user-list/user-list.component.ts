import { AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../shared/models/user.model';
import { UserService } from '../services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

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

  openUserDialog(user?: any) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      restoreFocus: false,
      width: '400px',
      data: {
        dialogTitle: user ? 'Edit User' : 'Add User',
        user,
      },
    });
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    dialogRef.componentInstance.submitClicked.subscribe(async (data: User) => {
      if (user) {
        await this.userService
          .updateUser(data)
          .toPromise()
          .then(async (updatedUser) => {
            // alert(
            //   `Successfully updated user: ${updatedUser.lastName}, ${updatedUser.firstName}`
            // );
            this.dataSource.data = await this.userService
              .getUsers()
              .toPromise();
            this.changeDetectorRef.detectChanges();
          });
      } else {
        const result = await this.userService
          .createUser(data)
          .toPromise()
          .then(async (newUser) => {
            this.dataSource.data = await this.userService
              .getUsers()
              .toPromise();
            this.changeDetectorRef.detectChanges();
          });
      }
    });
  }
}
