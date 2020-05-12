import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { AlertComponent } from './components/alert/components/alert.component';
import { GridComponent } from './components/grid/components/grid.component';
import { ActionButtonsComponent } from './components/action-buttons/components/action-buttons.component';
import { AlertService } from './services/alert.service';
import { CommunicationService } from './services/communication.service';
import { SortPipe } from './pipes/order-by';
import { FilterArrayPipe } from './pipes/filter-array-pipe';
import { SafeHtmlPipe } from './pipes/safe-html';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guard/auth.guard';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
    declarations: [
        AlertComponent,
        GridComponent,
        ActionButtonsComponent,
        SortPipe,
        FilterArrayPipe,
        SafeHtmlPipe
    ],
    imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [
        HttpService,
        AlertService,
        CommunicationService,
        AuthGuard,
        AuthenticationService
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        AlertComponent,
        GridComponent,
        ActionButtonsComponent,
        SortPipe,
        FilterArrayPipe,
        SafeHtmlPipe
    ]
})
export class SharedModule {}
