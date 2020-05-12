import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
/* import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing'; */
import { CategoryService } from './category.service';
import { HttpService } from '../../_shared/services/http.service';
import { of } from 'rxjs';
import { Category } from '../models/category';

describe('CategoryService', () => {
    // let httpTestingController: HttpTestingController;
    let categoryService: CategoryService;
    let httpService;
    const categoryColumn = [
        {
            headerName: 'Name',
            field: 'name',
            width: 100,
        },
    ];
    const CATEGORY_DATA = [
        {
            _id: '1',
            name: 'Test category',
        },
    ];

    beforeEach(async(() => {
        httpService = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);

        TestBed.configureTestingModule({
            // imports: [HttpClientTestingModule],
            providers: [
                CategoryService,
                { provide: HttpService, useValue: httpService },
            ],
        });

        // httpTestingController = TestBed.get(HttpTestingController);
        categoryService = TestBed.get(CategoryService);
    }));

    /* it('should call get columns and get proper response', fakeAsync(() => {

        categoryService.getColumns().subscribe((response) => {
            expect(response).toEqual(categoryColumn);
        });

        const req = httpTestingController.expectOne(
            '/assets/json/category-column.json'
        );
        req.flush(categoryColumn);
        tick();
        httpTestingController.verify();
    })); */

    it('should call get columns and get proper response', fakeAsync(() => {
        // httpService.get.and.returnValue(of(categoryColumn));

        httpService.get.and.callFake((url: string) => {
            expect(url).toBe('/assets/json/category-column.json');

            return of(categoryColumn);
        });

        categoryService.getColumns().subscribe((response) => {
            expect(response).toEqual(categoryColumn);
        });
        tick();

        expect(httpService.get).toHaveBeenCalled();
    }));

    it('should call get all category and get proper response', fakeAsync(() => {
        httpService.get.and.returnValue(of(CATEGORY_DATA));

        categoryService.getAllCategory().subscribe((response) => {
            expect(response).toEqual(CATEGORY_DATA);
        });
        tick();

        expect(httpService.get).toHaveBeenCalled();
    }));

    it('should call create a new category', fakeAsync(() => {
        httpService.post.and.returnValue(of(CATEGORY_DATA[0]));

        categoryService
            .createCategory(CATEGORY_DATA[0])
            .subscribe((response) => {
                expect(response).toEqual(CATEGORY_DATA[0]);
            });
        tick();

        expect(httpService.post).toHaveBeenCalled();
    }));

    it('should call update an existing category', fakeAsync(() => {
        httpService.put.and.returnValue(of(CATEGORY_DATA[0]));

        categoryService
            .updateCategory(CATEGORY_DATA[0])
            .subscribe((response) => {
                expect(response).toEqual(CATEGORY_DATA[0]);
            });
        tick();

        expect(httpService.put).toHaveBeenCalled();
    }));

    it('should call delete an existing category', fakeAsync(() => {
        httpService.delete.and.returnValue(of(CATEGORY_DATA[0].name));

        categoryService
            .deleteCategory(CATEGORY_DATA[0])
            .subscribe((response) => {
                expect(response).toEqual(CATEGORY_DATA[0].name);
            });
        tick();

        expect(httpService.delete).toHaveBeenCalled();
    }));
});
