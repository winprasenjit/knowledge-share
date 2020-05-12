import {
    async,
    TestBed,
    ComponentFixture,
    tick,
    fakeAsync,
    flush,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CategoryFormComponent } from './category-form.component';
import { CategoryService } from '../../services/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CategoryFormComponent', () => {
    let fixture: ComponentFixture<CategoryFormComponent>;
    let mockCategoryService: any;
    let mockactiveModal: any;

    beforeEach(async(() => {
        mockCategoryService = jasmine.createSpyObj([
            'createCategory',
            'updateCategory',
        ]);

        mockactiveModal = jasmine.createSpyObj(['close']);

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [CategoryFormComponent],
            providers: [
                {
                    provide: CategoryService,
                    useValue: mockCategoryService,
                },
                { provide: NgbActiveModal, useValue: mockactiveModal },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryFormComponent);
    }));

    it('should create the category form component', () => {
        const componentInstance = fixture.componentInstance;
        expect(componentInstance).toBeTruthy();
    });

    it('should create the category form group', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.data = false;

        fixture.detectChanges();

        expect(componentInstance.categoryForm).toBeTruthy();
    });

    it('should update the category form group', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.data = { id: 1, name: 'Test category' };

        fixture.detectChanges();

        expect(componentInstance.categoryForm).toBeTruthy();
    });

    it('should not create a new category if form is invalid', fakeAsync(() => {
        const componentInstance = fixture.componentInstance;
        const submitBtn = fixture.debugElement.query(By.css('.btn-primary'))
            .nativeElement;
        fixture.detectChanges();
        spyOn(componentInstance, 'onSubmit').and.callThrough();
        submitBtn.disabled = false;
        componentInstance.categoryForm.patchValue({ name: '' });

        submitBtn.click();
        tick();
        fixture.detectChanges();

        expect(componentInstance.onSubmit).toHaveBeenCalled();
    }));

    it('should create a new category', fakeAsync(() => {
        const componentInstance = fixture.componentInstance;
        const submitBtn = fixture.debugElement.query(By.css('.btn-primary'))
            .nativeElement;
        fixture.detectChanges();
        mockCategoryService.createCategory.and.returnValue(
            of({ _id: 1, name: 'Test Category' })
        );
        submitBtn.disabled = false;
        componentInstance.categoryForm.patchValue({ name: 'Test category' });

        submitBtn.click();
        tick();
        fixture.detectChanges();

        expect(mockCategoryService.createCategory).toHaveBeenCalled();
    }));

    it('should update an existing category', fakeAsync(() => {
        const componentInstance = fixture.componentInstance;
        const submitBtn = fixture.debugElement.query(By.css('.btn-primary'))
            .nativeElement;
        fixture.detectChanges();
        mockCategoryService.updateCategory.and.returnValue(
            of({ _id: 1, name: 'Test Category' })
        );
        submitBtn.disabled = false;
        componentInstance.categoryForm.patchValue({ name: 'Test category' });
        componentInstance.isUpdate = true;
        componentInstance.data = {};

        submitBtn.click();
        tick();
        fixture.detectChanges();

        expect(mockCategoryService.updateCategory).toHaveBeenCalled();
    }));
});
