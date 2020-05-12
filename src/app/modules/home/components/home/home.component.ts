import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommunicationService } from 'src/app/modules/_shared/services/communication.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    loadAPI: Promise<any>;

    constructor(private communicationService: CommunicationService) {}

    ngOnInit() {
        this.communicationService.setIsHome(true);
    }

    ngOnDestroy() {
        this.communicationService.clearIsHome();
    }
}
