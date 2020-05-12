import {
    TestBed,
    ComponentFixture,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { By } from '@angular/platform-browser';
import { SortPipe } from '../../../pipes/order-by';
import { SafeHtmlPipe } from '../../../pipes/safe-html';
import { FilterArrayPipe } from '../../../pipes/filter-array-pipe';

describe('GridComponent', () => {
    let fixture: ComponentFixture<GridComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                GridComponent,
                SortPipe,
                SafeHtmlPipe,
                FilterArrayPipe,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(GridComponent);
    });

    it('should create the component instance', () => {
        const componentInstance = fixture.componentInstance;

        fixture.detectChanges();

        expect(componentInstance).toBeTruthy();
    });

    it('should check the columns and dataset', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.columnList = null;
        componentInstance.dataSet = null;

        expect(componentInstance.dataList).toBeUndefined();
    });

    it('should generate the table for empty data set', () => {
        const componentInstance = fixture.componentInstance;
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];

        const data = [];

        componentInstance.page = -1;
        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;

        expect(componentInstance.dataList).toBeDefined();
    });

    it('should generate the table for new data', () => {
        const componentInstance = fixture.componentInstance;
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];

        const data = [
            { _id: '1', name: 'English' },
            { _id: 2, name: 'Geography' },
        ];

        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;

        expect(componentInstance.dataList).toBeDefined();
    });

    it('should generate the table for existing data', () => {
        const componentInstance = fixture.componentInstance;
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];

        const data = [{ _id: '1', name: 'English', guid: 'afggrr123effjfj' }];

        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;

        expect(componentInstance.dataList).toBeDefined();
    });

    it('should generate the cell template with call back', () => {
        const componentInstance = fixture.componentInstance;
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
                callBack: () => 1,
            },
        ];

        const data = [{ _id: '1', name: 'English', guid: 'afggrr123effjfj' }];

        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;

        expect(componentInstance.dataList).toBeDefined();
    });

    it('should sort the column accordingly', () => {
        const componentInstance = fixture.componentInstance;
        spyOn(componentInstance, 'sortBy').and.callThrough();
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];

        const data = [
            { _id: '1', name: 'English' },
            { _id: 2, name: 'Geography' },
        ];
        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;
        fixture.detectChanges();

        const columnHeaders = fixture.debugElement.queryAll(
            By.css('.disable-drag-drop')
        );
        columnHeaders[0].triggerEventHandler('click', null);

        expect(componentInstance.sortBy).toHaveBeenCalled();
    });

    it('should sort the column if order and datatype is mentioned', () => {
        const componentInstance = fixture.componentInstance;
        spyOn(componentInstance, 'sortBy').and.callThrough();
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
                dataType: 'string',
            },
        ];

        const data = [
            { _id: '1', name: 'English' },
            { _id: 2, name: 'Geography' },
        ];
        componentInstance.columns = columnList;
        componentInstance.dataSet = data;
        componentInstance.orderBy = 'asc';
        fixture.detectChanges();

        const columnHeaders = fixture.debugElement.queryAll(
            By.css('.disable-drag-drop')
        );
        columnHeaders[0].triggerEventHandler('click', null);

        expect(componentInstance.sortBy).toHaveBeenCalled();
    });

    it('should select a row', () => {
        const componentInstance = fixture.componentInstance;
        spyOn(componentInstance, 'selectRow').and.callThrough();
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
                dataType: 'string',
            },
        ];

        const data = [
            { _id: '1', name: 'English' },
            { _id: 2, name: 'Geography' },
        ];
        componentInstance.columns = columnList;
        componentInstance.dataSet = data;
        componentInstance.orderBy = 'asc';
        fixture.detectChanges();

        const columnHeaders = fixture.debugElement.queryAll(
            By.css('.grid-row')
        );
        columnHeaders[0].triggerEventHandler('click', null);

        expect(componentInstance.selectRow).toHaveBeenCalled();
    });

    it('should deselct a selected a row', () => {
        const componentInstance = fixture.componentInstance;
        spyOn(componentInstance, 'selectRow').and.callThrough();
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
                dataType: 'string',
            },
        ];

        const data = [
            { _id: '1', name: 'English', guid: '4435ggr757' },
            { _id: 2, name: 'Geography', guid: '444554ggr757' },
        ];
        componentInstance.columns = columnList;
        componentInstance.dataSet = data;
        componentInstance.dataList = data;
        componentInstance.pagedItems = data;
        componentInstance.orderBy = 'asc';
        componentInstance.gridEventObj.selection = {
            selected: true,
            selectedRow: 0,
            selectedIndex: 1,
            items: data[0],
        };
        fixture.detectChanges();

        const columnHeaders = fixture.debugElement.queryAll(
            By.css('.grid-row')
        );
        columnHeaders[0].triggerEventHandler('click', null);

        expect(componentInstance.selectRow).toHaveBeenCalled();
    });

    it('should add a new row into the grid', () => {
        const componentInstance = fixture.componentInstance;
        const data = [
            { _id: '1', name: 'English' },
            { _id: '2', name: 'Geography' },
        ];
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];
        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;
        let count = componentInstance.data.length;

        componentInstance.addRow({ _id: '1', name: 'Test' });

        expect(componentInstance.data.length).toBe(++count);
    });

    it('should update an existing row into the grid', () => {
        const componentInstance = fixture.componentInstance;
        const data = [
            { _id: '1', name: 'English', guid: 'sdsdsd2242rffd' },
            { _id: '2', name: 'Geography', guid: 'sdsfdfd2242rffd' },
        ];
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];
        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;

        componentInstance.updateRow({ _id: '5', name: 'Test' }, 1);

        expect(componentInstance.data).toEqual([
            { _id: '1', name: 'English', guid: 'sdsdsd2242rffd' },
            { _id: '5', name: 'Test', guid: 'sdsfdfd2242rffd' },
        ]);
    });

    it('should remove a row into the grid', () => {
        const componentInstance = fixture.componentInstance;
        const data = [
            { _id: '1', name: 'English', guid: 'sdsdsd2242rffd' },
            { _id: '2', name: 'Geography', guid: 'sdsfdfd2242rffd' },
        ];
        const columnList = [
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
            },
        ];
        componentInstance.columnList = columnList;
        componentInstance.dataSet = data;

        componentInstance.removeRow(1);

        expect(componentInstance.data).toEqual([
            { _id: '1', name: 'English', guid: 'sdsdsd2242rffd' },
        ]);
    });

    it('should filter data of a column', () => {
        const componentInstance = fixture.componentInstance;
        const { data, columnList } = getDefaultData();
        componentInstance.columns = columnList;
        componentInstance.dataSet = data;
        componentInstance.stackedDataList = data;
        fixture.detectChanges();
        const columnFilter = fixture.debugElement.queryAll(
            By.css('.column-filter')
        )[0];
        const searchInput = fixture.debugElement.queryAll(
            By.css('.column-filter')
        )[0].nativeElement;
        searchInput.value = 'English';

        columnFilter.triggerEventHandler('keyup', null);

        expect(componentInstance.data).toEqual([data[0]]);
    });
});

function getDefaultData() {
    const data = [
        { _id: '1', name: 'English', guid: 'sdsdsd2242rffd' },
        { _id: '2', name: 'Geography', guid: 'sdsfdfd2242rffd' },
    ];
    const columnList = [
        {
            headerName: 'Name',
            field: 'name',
            width: 100,
        },
    ];

    return { data, columnList };
}
