import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';

import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Column } from '../../_shared/models/column.model';
import { GridComponent } from '../../_shared/components/grid/components/grid.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    columnLoaded = false;
    category: Category[] = [];
    column: Column[];
    selectedItems: Category;
    rowIndex: number;

    @ViewChild(forwardRef(() => GridComponent)) gridComponent: GridComponent;

    constructor(
        private categoryService: CategoryService,
        public dialog: NgbModal
    ) {}

    ngOnInit(): void {
        this.getCategoryColumn();
        this.getCategoryData();
    }

    getCategoryColumn(): void {
        this.categoryService.getColumns().subscribe((data: Column[]) => {
            this.column = data;
            this.columnLoaded = true;
        });
    }

    getCategoryData(): void {
        this.categoryService
            .getAllCategory()
            .subscribe((result: Category[]) => {
                this.category = result;
            });
    }

    createCategory(): void {
        const dialogRef = this.dialog.open(CategoryFormComponent);
    }

    updateCategory(): void {
        const dialogRef = this.dialog.open(CategoryFormComponent);
        dialogRef.componentInstance.data = this.selectedItems;
    }

    deleteCategory(): void {
        this.categoryService
            .deleteCategory(this.selectedItems.name)
            .subscribe((result: any) => {
                if (result.success) {
                    this.gridComponent.removeRow(this.rowIndex);
                }
            });
    }

    trackEvent(event: any): void {
        this.selectedItems = null;
        this.rowIndex = null;
        if (event.selection && event.selection.selected) {
            this.selectedItems = event.selection.items;
            this.rowIndex = event.selection.selectedIndex;
        }
    }
}
