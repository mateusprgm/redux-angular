import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from './user/action/user.action';
import { selectAllUsers, selectLoading, selectUserState } from './user/selector/user.selector';
import { User } from './user/model/user.model';
import { UserService } from './user/service/user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="load()">Carregar Usuários</button>
    <div *ngIf="loading$ | async">Carregando...</div>
    <ul>
      <li *ngFor="let user of users$ | async">{{ user.name }}</li>
    </ul>
  `
})
export class App {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  usersState$: Observable<any>;

  constructor(private readonly store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
    this.usersState$ = this.store.select(selectUserState);
  }

  load() {
    this.usersState$.subscribe(state => {
      console.log('Estado dos usuários:', state);
    })
    this.store.subscribe(state => {
      console.log('Estado atual:', state);
    });
    this.store.dispatch(UserActions.loadUsers());
  }
}
