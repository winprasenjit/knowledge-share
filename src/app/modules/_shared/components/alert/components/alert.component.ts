import { AlertService } from './../../../services/alert.service';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService
            .getMessage()
            .subscribe(message => {
            this.message = message;
        });
    }

}
