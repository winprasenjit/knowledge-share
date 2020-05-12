import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../services/category.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActionButtonsComponent } from '../../_shared/components/action-buttons/components/action-buttons.component';
import { By } from '@angular/platform-browser';
import { GridComponent } from '../../_shared/components/grid/components/grid.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CategoryComponent', () => {
    let fixture: ComponentFixture<CategoryComponent>;
    let mockCategoryService;
    const CATEGORY_COLUMN = [
        {
            headerName: 'Name',
            field: 'name',
            width: 100,
        },
    ];

    beforeEach(async(() => {
        mockCategoryService = jasmine.createSpyObj([
            'getColumns',
            'getAllCategory',
            'deleteCategory',
        ]);

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [
                CategoryComponent,
                ActionButtonsComponent,
                GridComponent,
            ],
            providers: [
                { provide: CategoryService, useValue: mockCategoryService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryComponent);
        fixture.componentInstance.gridComponent = TestBed.createComponent(
            GridComponent
        ).componentInstance as GridComponent;
    }));

    it('should create the category component', () => {
        const componentInstance = fixture.componentInstance;
        expect(componentInstance).toBeTruthy();
    });

    it('should display list of category', () => {
        const componentInstance = fixture.componentInstance;

        mockCategoryService.getColumns.and.returnValue(of(CATEGORY_COLUMN));
        mockCategoryService.getAllCategory.and.returnValue(of([]));

        fixture.detectChanges();

        expect(componentInstance.columnLoaded).toBeTruthy();
        expect(componentInstance.category).toBeDefined();
    });

    it('should triggered the create method', () => {
        const componentInstance = fixture.componentInstance;
        spyOn(componentInstance, 'createCategory').and.callThrough();

        const actionBtnComponent = fixture.debugElement.query(
            By.directive(ActionButtonsComponent)
        );
        (actionBtnComponent.componentInstance as ActionButtonsComponent).create.emit(
            undefined
        );

        expect(componentInstance.createCategory).toHaveBeenCalled();
    });

    it('should triggered the update method', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.selectedItems = { _id: '1', name: 'English' };
        spyOn(componentInstance, 'updateCategory').and.callThrough();

        const actionBtnComponent = fixture.debugElement.query(
            By.directive(ActionButtonsComponent)
        );
        (actionBtnComponent.componentInstance as ActionButtonsComponent).update.emit(
            { selection: componentInstance.selectedItems }
        );

        expect(componentInstance.updateCategory).toHaveBeenCalled();
    });

    it('should triggered the delete method', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.selectedItems = { _id: '1', name: 'English' };
        spyOn(componentInstance, 'deleteCategory').and.callThrough();
        mockCategoryService.deleteCategory.and.returnValue(
            of({ success: true })
        );
        spyOn(fixture.componentInstance.gridComponent, 'removeRow');

        const actionBtnComponent = fixture.debugElement.query(
            By.directive(ActionButtonsComponent)
        );
        (actionBtnComponent.componentInstance as ActionButtonsComponent).delete.emit(
            { selection: componentInstance.selectedItems }
        );

        expect(componentInstance.deleteCategory).toHaveBeenCalled();
        expect(mockCategoryService.deleteCategory).toHaveBeenCalled();
        expect(
            fixture.componentInstance.gridComponent.removeRow
        ).toHaveBeenCalled();
    });

    it('should triggered the delete method with error response', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.selectedItems = { _id: '1', name: 'English' };
        spyOn(componentInstance, 'deleteCategory').and.callThrough();
        mockCategoryService.deleteCategory.and.returnValue(
            of({ success: false })
        );

        const actionBtnComponent = fixture.debugElement.query(
            By.directive(ActionButtonsComponent)
        );
        (actionBtnComponent.componentInstance as ActionButtonsComponent).delete.emit(
            { selection: componentInstance.selectedItems }
        );

        expect(componentInstance.deleteCategory).toHaveBeenCalled();
        expect(mockCategoryService.deleteCategory).toHaveBeenCalled();
    });

    it('should triggered track selected event', () => {
        mockCategoryService.getColumns.and.returnValue(of(CATEGORY_COLUMN));
        mockCategoryService.getAllCategory.and.returnValue(of([]));
        spyOn(fixture.componentInstance, 'trackEvent').and.callThrough();

        fixture.detectChanges();
        fixture.componentInstance.gridComponent.gridEvent.emit({
            selection: { selected: true },
        });

        expect(fixture.componentInstance.trackEvent).toHaveBeenCalled();
    });

    it('should remove selected items', () => {
        mockCategoryService.getColumns.and.returnValue(of(CATEGORY_COLUMN));
        mockCategoryService.getAllCategory.and.returnValue(of([]));
        spyOn(fixture.componentInstance, 'trackEvent').and.callThrough();

        fixture.detectChanges();
        fixture.componentInstance.gridComponent.gridEvent.emit({
            selection: { selected: false },
        });

        expect(fixture.componentInstance.trackEvent).toHaveBeenCalled();
    });
});
