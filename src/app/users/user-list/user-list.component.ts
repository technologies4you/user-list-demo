import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource.data = this.userService.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
