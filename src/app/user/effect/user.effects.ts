import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import * as UserActions from '../action/user.action';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {
    loadUsers$: any;

    constructor(
        private readonly actions$: Actions,
        private readonly userService: UserService
    ) {
        this.loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
            this.userService.getUsers().pipe(
                map(users => UserActions.loadUsersSuccess({ users })),
                catchError(error => of(UserActions.loadUsersFailure({ error })))
            )
            )
        )
        );
    }
}