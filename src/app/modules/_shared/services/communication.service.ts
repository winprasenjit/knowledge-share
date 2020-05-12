import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class CommunicationService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    private isHome = new BehaviorSubject<boolean>(false);

    getLoginType(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    setLoginType(type: boolean) {
        this.loggedIn.next(type);
    }

    clearLoginType(loginType = false) {
        this.loggedIn.next(loginType);
    }

    getIsHome(): Observable<boolean> {
        return this.isHome.asObservable();
    }

    setIsHome(type: boolean) {
        this.isHome.next(type);
    }

    clearIsHome(type = false) {
        this.isHome.next(type);
    }
}
