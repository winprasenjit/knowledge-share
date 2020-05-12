import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppstate } from 'src/app/modules/_shared/helpers/store';

@Component({
    selector: 'list-task',
    templateUrl: './list-task.component.html',
    styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
    @Input() data: any;

    taskList: any[] = [];

    constructor(private ngRedux: NgRedux<IAppstate>) {}

    ngOnInit() {
        this.ngRedux.subscribe(() => {
            this.taskList = this.ngRedux.getState().tasking.taskList;
            // console.dir(this.ngRedux.getState());
        });
    }
}
