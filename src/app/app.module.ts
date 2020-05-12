import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IAppstate, rootReducer, INITIAL_STATE } from './modules/_shared/helpers/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/_shared/shared.module';
import { LoginComponent } from './modules/login/components/login.component';
import { HeaderComponent } from './modules/header/header.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { FooterComponent } from './modules/footer/footer.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { ContactModule } from './modules/contact/contact.module';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import { TaskModule } from './modules/task/task.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        LoginComponent,
        RegistrationComponent,
        DashboardComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ContactModule,
        SharedModule,
        TaskModule,
        NgReduxModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        ngRedux: NgRedux<IAppstate>,
        devTools: DevToolsExtension
    ) {
        const enhancer = (isDevMode) ? [devTools.enhancer()] : [];
        ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancer);
    }
}
