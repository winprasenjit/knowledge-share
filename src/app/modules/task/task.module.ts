import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
      AddTaskComponent,
      ListTaskComponent
  ],
  exports: [AddTaskComponent, ListTaskComponent],
  entryComponents : [AddTaskComponent, ListTaskComponent]
})
export class TaskModule { }
