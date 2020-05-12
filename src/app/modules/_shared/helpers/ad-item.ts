import { Type } from '@angular/core';
import { ImageUploaderComponent } from '../components/image-uploader/image-uploader.component';
import { AddTaskComponent } from '../../task/components/add-task/add-task.component';
import { ListTaskComponent } from '../../task/components/list-task/list-task.component';

export class AddItem {
    classes = {
        AddTaskComponent,
        ListTaskComponent,
        ImageUploaderComponent
    };

    constructor(public component: Type<any>, public data: any) {
        if (typeof component === 'string') {
            this.component = this.getComponentClass(component);
        }
    }

    getComponentClass(className: string) {
        return this.classes[className];
    }
}
