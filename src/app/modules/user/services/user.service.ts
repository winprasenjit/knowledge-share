import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { ApiSettings } from '../../_shared/constants/api.constant';
import { Column } from '../../_shared/models/column.model';
import { HttpService } from '../../_shared/services/http.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private userAPI = ApiSettings.USER_API;
    selectedUser: User;

    constructor(private httpService: HttpService) {}

    getColumns(): Observable<Column[]> {
        return this.httpService
            .get(ApiSettings.USER_COLUMN_JSON)
            .pipe(map((result: any) => result as Column[]));
    }

    getAllUser(): Observable<User[]> {
        return this.httpService
            .get(this.userAPI)
            .pipe(map((result: any) => result as User[]));
    }

    getUser(id): Observable<User> {
        return this.httpService
            .get(this.userAPI + '/' + id)
            .pipe(map((result: any) => result as User));
    }

    createUser(formData: User): Observable<User> {
        return this.httpService
            .post(this.userAPI, formData)
            .pipe(map((result: any) => result as User));
    }

    updateUser(formData: User): Observable<User> {
        return this.httpService
            .put(this.userAPI, formData)
            .pipe(map((result: any) => result as User));
    }

    deleteUser(username): Observable<string> {
        return this.httpService
            .delete(this.userAPI, { username })
            .pipe(map((result: any) => result as string));
    }
}
