import { Component, OnInit, Inject, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
    isUpdate = false;
    categoryForm: FormGroup;
    submitted = false;

    @Input() data;

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        this.isUpdate = !this.data ? false : true;
        this.categoryForm = this.fb.group({
            name: [
                this.data ? this.data.name : '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ]
        });
    }

    onSubmit({ value, valid }: { value: any; valid: boolean }): void {
        if (valid) {
            if (!this.isUpdate) {
                this.saveCategory(value);
            } else {
                this.updateCategory(value);
            }
        }
    }

    saveCategory(value: Category): void {
        this.categoryService
            .createCategory(value)
            .subscribe((result: Category) => {
                this.activeModal.close(result);
            });
    }

    updateCategory(value: Category): void {
        Object.assign(this.data, value);
        this.categoryService
            .updateCategory(this.data)
            .subscribe((result: Category) => {
                this.activeModal.close(result);
            });
    }
}
