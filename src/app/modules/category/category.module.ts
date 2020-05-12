import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { SharedModule } from '../_shared/shared.module';
import { CategoryRouting } from './category.routing';

@NgModule({
    imports: [CommonModule, SharedModule, CategoryRouting],
    declarations: [CategoryComponent, CategoryFormComponent],
    exports: [CategoryComponent],
    providers: [],
    entryComponents: [CategoryFormComponent]
})
export class CategoryModule {}
