import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './modules/category/components/category.component';
import { AuthGuard } from './modules/_shared/guard/auth.guard';
import { LoginComponent } from './modules/login/components/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'category',
        loadChildren: () =>
            import('./modules/category/category.module').then(
                m => m.CategoryModule
            ),
        canActivate: [AuthGuard]
    },
    {
        path: 'timeline',
        loadChildren: './modules/timeline/timeline.module#TimelineModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
