import { FilterArrayPipe } from './filter-array-pipe';
describe('FilterArrayPipe', () => {
    const filterArrPipe = new FilterArrayPipe();

    it('should give complete record set if no filter is choosen', () => {
        const DATA = [
            { _id: 1, name: 'Apple' },
            { _id: 2, name: 'Microsoft' },
        ];
        const args = undefined;

        const result = filterArrPipe.transform(DATA, args);

        expect(result).toEqual(DATA);
    });

    it('should give empty set for empty dataset', () => {
        const DATA = [];
        const args = 'Microsoft';

        const result = filterArrPipe.transform(DATA, args);

        expect(result).toEqual([]);
    });

    it('should filter the dataset', () => {
        const DATA = [
            { _id: 1, name: 'Apple' },
            { _id: 2, name: 'Microsoft' },
        ];
        const args = 'Microsoft';

        const result = filterArrPipe.transform(DATA, args);

        expect(result).toEqual([]);
    });
});
