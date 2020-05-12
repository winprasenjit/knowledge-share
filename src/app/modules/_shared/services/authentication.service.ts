import { ApiSettings } from './../constants/api.constant';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../../user/models/user.model';
import { HttpService } from './http.service';

@Injectable()
export class AuthenticationService {
    // tslint:disable-next-line:variable-name
    private _user: any;
    constructor(private httpService: HttpService) { }

    isLoggedIn(): boolean {
        return (localStorage.getItem('currentUser')) ? true : false;
    }

    login(username: string, password: string): any {
        return this.httpService
            .post(ApiSettings.AUTHENTICATE_API, {
                username,
                password
            })
            .pipe(map((response: Response) => {
                const user = response;
                if (user) {
                    this._user = user;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    get User(): User {
        return this._user;
    }
}
