import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppstate } from '../../../_shared/helpers/store';
import { GlobalConstant } from '../../../_shared/constants/global.constant';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    @Input() data: any;

    taskname: string;
    @select() taskList;

    constructor(private ngRedux: NgRedux<IAppstate>) {}

    ngOnInit() {
        /* this.ngRedux
            .subscribe(() => {
                this.taskList = this.ngRedux.getState().taskList;
            }); */
    }

    addTask(): void {
        if (this.taskname) {
            this.ngRedux.dispatch({
                type: GlobalConstant.ADD_TASK,
                taskname: this.taskname
            });
            this.taskname = '';
        }
    }

    removeTask(taskname: string): void {
        const index = this.taskList.indexOf(taskname);
        this.taskList.splice(index, 1);
        this.ngRedux.dispatch({
            type: GlobalConstant.REMOVE_TASK,
            taskname
        });
    }
}
