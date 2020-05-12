import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortPipe',
})
export class SortPipe implements PipeTransform {
    transform(array: any[], key: string): any[] {
        if (key === undefined || key === '' || array === undefined) {
            return array;
        }

        const arr = key.split('-');
        const keyString = arr[0]; // string or column name to sort(name or age or date)
        const sortOrder = arr[1]; // asc or desc order
        const dataType = arr[2]; // datatype
        const byVal = 1;

        array.sort((a: any, b: any) => {
            if (dataType === 'date') {
                const left = Number(new Date(a[keyString]));
                const right = Number(new Date(b[keyString]));

                return sortOrder === 'asc' ? right - left : left - right;
            } else if (dataType === 'string') {
                if (
                    this.isNumeric(a[keyString]) ||
                    this.isNumeric(b[keyString])
                ) {
                    a[keyString] = String(a[keyString]);
                    b[keyString] = String(b[keyString]);
                }

                if (a[keyString].toLowerCase() < b[keyString].toLowerCase()) {
                    return sortOrder === 'asc' ? -1 * byVal : 1 * byVal;
                } else if (a[keyString] > b[keyString]) {
                    return sortOrder === 'asc' ? 1 * byVal : -1 * byVal;
                } else {
                    return 0;
                }
            } else if (dataType === 'number') {
                return sortOrder === 'asc'
                    ? a[keyString] - b[keyString]
                    : b[keyString] - a[keyString];
            }
        });

        return array;
    }

    isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
