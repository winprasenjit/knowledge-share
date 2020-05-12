import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouting } from './user.routing';
import { UserComponent } from './components/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';
import { ContactModule } from '../contact/contact.module';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
    declarations: [
        UserComponent,
        UserFormComponent,
        ViewUserComponent
    ],
    imports: [
        CommonModule,
        UserRouting,
        ContactModule,
        SharedModule
    ],
    entryComponents : [UserFormComponent],
    bootstrap: [UserFormComponent],
    exports: [UserComponent],
    providers: []
})
export class UserModule { }
