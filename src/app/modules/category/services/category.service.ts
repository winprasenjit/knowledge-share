import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ApiSettings } from '../../_shared/constants/api.constant';
import { map } from 'rxjs/operators';
import { HttpService } from '../../_shared/services/http.service';
import { Column } from '../../_shared/models/column.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private categoryAPI = ApiSettings.CATEGORY_API;

    constructor(private httpService: HttpService) {}

    getColumns(): Observable<Column[]> {
        return this.httpService
            .get(ApiSettings.CATEGORY_COLUMN_JSON)
            .pipe(map((result: any) => result as Column[]));
    }

    getAllCategory(): Observable<Category[]> {
        return this.httpService
            .get(this.categoryAPI)
            .pipe(map((result: any) => result as Category[]));
    }

    createCategory(formData: Category): Observable<Category> {
        return this.httpService
            .post(this.categoryAPI, formData)
            .pipe(map((result: any) => result as Category));
    }

    updateCategory(formData: Category): Observable<Category> {
        return this.httpService
            .put(this.categoryAPI, formData)
            .pipe(map((result: any) => result as Category));
    }

    deleteCategory(name): Observable<string> {
        return this.httpService
            .delete(this.categoryAPI, { name })
            .pipe(map((result: any) => result as string));
    }
}
