import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../action/user.action'
import { User } from '../model/user.model';

export interface UserState {
    users: User[];
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);