import { SortPipe } from './order-by';
import { map } from 'rxjs/operators';

describe('SortPipe', () => {
    const orderByPipe = new SortPipe();

    it('should give record set as it is if no key specified', () => {
        const DATA = [
            { _id: 1, name: 'Apple' },
            { _id: 2, name: 'Microsoft' },
        ];
        const args = '';

        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(DATA);
    });

    it('should give recordset in desending order', () => {
        const DATA = [
            { _id: 1, name: 'Apple' },
            { _id: 2, name: 'Microsoft' },
        ];
        const args = 'name-desc-string';

        const expectedArr = JSON.parse(JSON.stringify(DATA)).reverse();
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should give recordset in asending sorting order', () => {
        const DATA = [
            { _id: 1, name: 'Apple' },
            { _id: 2, name: 'Microsoft' },
        ];
        const args = 'name-asc-string';

        const expectedArr = JSON.parse(JSON.stringify(DATA));
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should give same recordset for already descendent', () => {
        const DATA = [
            { _id: 1, name: 'Microsoft' },
            { _id: 2, name: 'Apple' },
        ];
        const args = 'name-desc-string';

        const expectedArr = JSON.parse(JSON.stringify(DATA));
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should give ascendent recordset for already descedent', () => {
        const DATA = [
            { _id: 1, name: 'Microsoft' },
            { _id: 2, name: 'Apple' },
        ];
        const args = 'name-asc-string';

        const expectedArr = JSON.parse(JSON.stringify(DATA)).reverse();
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should give unsorted recordset for identical array', () => {
        const DATA = [
            { _id: 1, name: 'Microsoft' },
            { _id: 2, name: 'Microsoft' },
        ];
        const args = 'name-asc-string';

        const expectedArr = JSON.parse(JSON.stringify(DATA));
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should sort the recordset in desending order depending on the date', () => {
        const DATA = [
            { dob: '1986-11-25', name: 'Apple' },
            { dob: '1984-05-05', name: 'Microsoft' },
        ];
        const args = 'dob-desc-date';

        const expectedArr = JSON.parse(JSON.stringify(DATA)).reverse();
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should sort the recordset in asending order depending on the date', () => {
        const DATA = [
            { dob: '1984-05-05', name: 'Microsoft' },
            { dob: '1986-11-25', name: 'Apple' },
        ];
        const args = 'dob-asc-date';

        const expectedArr = JSON.parse(JSON.stringify(DATA)).reverse();
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should sort the recordset depending on the number in descending order', () => {
        const DATA = [
            { salary: 100000, name: 'Microsoft' },
            { salary: 200000, name: 'Facebook' },
        ];
        const args = 'salary-desc-number';

        const expectedArr = JSON.parse(JSON.stringify(DATA)).reverse();
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should sort the recordset depending on the number in ascending order', () => {
        const DATA = [
            { salary: 100000, name: 'Microsoft' },
            { salary: 200000, name: 'Facebook' },
        ];
        const args = 'salary-asc-number';

        const expectedArr = JSON.parse(JSON.stringify(DATA));
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should also sort the recordset if value is numeric', () => {
        const DATA = [
            { salary: 100000, name: 'Microsoft' },
            { salary: 200000, name: 'Facebook' },
        ];
        const args = 'salary-desc-string';

        const expectedArr = JSON.parse(JSON.stringify(DATA))
            .reverse()
            .map((x: any) => {
                return {
                    salary: String(x.salary),
                    name: x.name,
                };
            });
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });

    it('should return the same recordset for unknown datatype', () => {
        const DATA = [
            { salary: 100000, name: 'Microsoft' },
            { salary: 200000, name: 'Facebook' },
        ];
        const args = 'salary-asc-xyz';

        const expectedArr = JSON.parse(JSON.stringify(DATA));
        const result = orderByPipe.transform(DATA, args);

        expect(result).toEqual(expectedArr);
    });
});
