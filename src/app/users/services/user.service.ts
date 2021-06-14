import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';

import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { tap, catchError, map, scan } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'api/users';
  private headers = () => {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  };

  private users$: Observable<User[]> = this.http
    .get<User[]>(this.usersUrl)
    .pipe(
      map((users) =>
        users.map(
          (user) =>
            ({
              ...user,
              fullName: user.firstName.concat(' ').concat(user.lastName),
            } as User)
        )
      ),
      catchError(this.handleError)
    );

  get Users$() {
    return this.users$;
  }

  private userSelectedSubject = new BehaviorSubject<number>(0);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  selectedUser$ = combineLatest([this.users$, this.userSelectedAction$]).pipe(
    map(([users, userId]) => users.find((user) => user.id === userId)),
    tap(console.log)
  );

  get SelectedUser$() {
    return this.selectedUser$;
  }

  private userAddedSubject = new Subject<User>();
  userAddedAction$ = this.userAddedSubject.asObservable();

  private usersWithAdd$ = merge(this.users$, this.userAddedAction$).pipe(
    tap(console.log),
    scan((acc: User[], value: User) => [...acc, value])
  );

  public get UsersWithAdd$() {
    return this.usersWithAdd$;
  }

  private userEditedSubject = new Subject<User>();
  userEditedAction$ = this.userEditedSubject.asObservable();

  private usersAfterEdit$ = merge(
    this.usersWithAdd$,
    this.userEditedAction$
  ).pipe(
    tap(console.log),
    scan((acc: User[], value: User) => {
      console.log([acc, value]);
      return acc.map((user) => (user.id === value.id ? value : user));
    })
  );

  public get UsersAfterEdit$() {
    return this.usersAfterEdit$;
  }

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    const headers = this.headers();
    const newUser = { ...user, id: null };
    return this.http.post<User>(this.usersUrl, newUser, { headers }).pipe(
      tap((data) => console.log('createUser: ' + JSON.stringify(data))),
      // tap((user) => this.userAddedSubject.next(user)),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<{}> {
    const headers = this.headers();
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, { headers }).pipe(
      tap(() => console.log('deleteUser: ' + id)),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    const headers = this.headers();
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, { headers }).pipe(
      tap(() => console.log('updateUser: ' + user.id)),
      map(() => user),
      tap(console.log),
      tap((user) => this.userEditedSubject.next(user)),
      catchError(this.handleError)
    );
  }

  selectedUserChanged(selectedUserId: number): void {
    console.log(selectedUserId);
    this.userSelectedSubject.next(selectedUserId);
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
