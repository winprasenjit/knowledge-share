import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_shared/services/authentication.service';
import { AlertService } from '../../_shared/services/alert.service';
import { CommunicationService } from '../../_shared/services/communication.service';
import { User } from '../../user/models/user.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    user: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private communicationService: CommunicationService
    ) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.communicationService.setLoginType(false);

        // get return url from route parameters or default to '/'
        this.returnUrl =
            this.route.snapshot.queryParams.returnUrl || '/dashboard';

        this.user = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    onSubmit({ value, valid }: { value: User; valid: boolean }) {
        if (valid) {
            this.authenticationService
                .login(value.username, value.password)
                .subscribe(
                    (data: User) => {
                        this.router.navigate([this.returnUrl]);
                        this.communicationService.setLoginType(true);
                    },
                    error => {
                        this.alertService.error(error._body);
                        // this.loading = false;
                    }
                );
        }
    }
}
