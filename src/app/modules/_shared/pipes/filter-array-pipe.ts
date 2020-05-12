import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterArray',
    pure: true,
})
export class FilterArrayPipe implements PipeTransform {
    transform(items: any[], args: any): any {
        const discarded = ['_id', '__v', 'guid'];
        let filter = args;
        const filteredItem = [];
        if (filter !== undefined && filter.length !== null) {
            filter = filter.toString();
            if (filter.length === 0 || items.length === 0) {
                return items;
            } else {
                items.filter((item) => {
                    for (const x in item) {
                        if (
                            item[x]
                                .toString()
                                .toLocaleLowerCase()
                                .indexOf(filter) !== -1 &&
                            discarded.indexOf(x) <= -1
                        ) {
                            filteredItem.push(item);
                            break;
                        }
                    }
                });
                return filteredItem;
            }
        }

        return items;
    }
}
