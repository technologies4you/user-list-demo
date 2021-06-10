import { AfterViewInit, ViewChild } from '@angular/core';
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
    'phone',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(private userService: UserService, public dialog: MatDialog) {}

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
    console.log(user);
    const dialogRef = this.dialog.open(UserEditComponent, {
      restoreFocus: false,
      // height: '500px',
      width: '400px',
      data: {
        dialogTitle: user ? 'Edit User' : 'Add User',
        user,
      },
    });
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    dialogRef.componentInstance.submitClicked.subscribe((data) => {
      console.log(data);
    });
  }
}
