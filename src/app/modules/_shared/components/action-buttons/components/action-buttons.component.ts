import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.css'],
})
export class ActionButtonsComponent implements OnInit {
    isSelected: any;
    hideCreateBtn = false;

    @Output() create = new EventEmitter();
    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    constructor() {}

    @Input()
    set disabledWhen(value: any) {
        this.isSelected = value;
    }

    @Input('hide-create-button')
    set hideCreateButton(value: boolean) {
        this.hideCreateBtn = value;
    }

    ngOnInit() {}

    createFn(): void {
        this.create.emit();
    }

    updateFn(): void {
        this.update.emit({ selection: this.isSelected });
    }

    deleteFn(): void {
        this.delete.emit({ selection: this.isSelected });
    }
}
