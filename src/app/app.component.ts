import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from './modules/user/models/user.model';
import { AuthenticationService } from './modules/_shared/services/authentication.service';
import { CommunicationService } from './modules/_shared/services/communication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'knowledge-share';
    userInfo: User = new User();
    bodyClass: string;
    isLoggedIn = false;
    rowData = [];
    isHome = false;

    constructor(
        private authService: AuthenticationService,
        private communicationService: CommunicationService
    ) {}

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.setLayout();
        this.communicationService
            .getLoginType()
            .subscribe((loggedin: boolean) => {
                setTimeout(() => {
                    this.isLoggedIn = loggedin;
                    this.setLayout();
                });
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.communicationService
                .getIsHome()
                .subscribe((result: boolean) => {
                    this.isHome = result;
                    this.setLayout();
                });
        }, 600);
    }

    setLayout() {
        //   this.userInfo = this.sharedService.userInfo;
        this.bodyClass = this.isHome
            ? 'home-container'
            : this.isLoggedIn
            ? 'page-wrapper'
            : 'login-wrapper';
    }
}
