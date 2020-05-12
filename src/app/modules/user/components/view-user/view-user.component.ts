import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
    user: User = new User();

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        console.log(this.route.snapshot.params.id);
    }

    ngOnInit() {
        if (this.userService.selectedUser) {
            this.getUserDetails(this.userService.selectedUser);
        } else {
            this.userService
                .getUser(this.route.snapshot.params.id)
                .subscribe((data: User) => {
                    this.getUserDetails(data);
                });
        }
    }

    getUserDetails(user: User) {
        this.user = new User(user);
        this.user.createFullName();
        this.user.createRating();
    }
}
