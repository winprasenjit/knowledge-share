import { UserComponent } from './components/user.component';

import { RouterModule, Routes } from '@angular/router';
import {ViewUserComponent} from './components/view-user/view-user.component';

const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'view-user/:id', component : ViewUserComponent}
];

export const UserRouting = RouterModule.forChild(routes);
