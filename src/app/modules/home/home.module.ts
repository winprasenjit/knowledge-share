import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRouting } from './home.routing';

@NgModule({
    imports: [CommonModule, HomeRouting],
    declarations: [HomeComponent]
})
export class HomeModule {}
