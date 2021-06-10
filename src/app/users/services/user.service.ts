import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';

import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newUser = { ...user, id: null };
    return this.http.post<User>(this.usersUrl, newUser, { headers }).pipe(
      tap((data) => console.log('createUser: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, { headers }).pipe(
      tap(() => console.log('deleteUser: ' + id)),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, { headers }).pipe(
      tap(() => console.log('updateUser: ' + user.id)),
      map(() => user),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
