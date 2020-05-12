import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category.component';

const routes: Routes = [
    { path: '', component: CategoryComponent }
];

export const CategoryRouting = RouterModule.forChild(routes);
