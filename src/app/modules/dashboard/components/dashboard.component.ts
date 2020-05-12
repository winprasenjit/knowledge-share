import {
    Component,
    OnInit,
    ViewChildren,
    ViewContainerRef,
    QueryList,
    ComponentFactoryResolver
} from '@angular/core';

import { map } from 'rxjs/operators';
import { HttpService } from '../../_shared/services/http.service';
import { AddItem } from '../../_shared/helpers/ad-item';

declare var jQuery: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    @ViewChildren('item', { read: ViewContainerRef }) itemContainer: QueryList<
        ViewContainerRef
    >;

    panels;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private httpService: HttpService
    ) {}

    ngOnInit() {
        const options = {
            cellHeight: 80,
            verticalMargin: 10
        };

        this.httpService
            .get('/assets/json/dashboard.json')
            .pipe(map(response => response))
            .subscribe(data => {
                this.panels = data;
                setTimeout(() => {
                    jQuery('.grid-stack').gridstack(options);

                    for (
                        let i = 0;
                        i < this.itemContainer.toArray().length;
                        i++
                    ) {
                        const viewContainerRef = this.itemContainer.toArray()[
                            i
                        ];
                        const addItem = new AddItem(
                            this.panels[i].component,
                            this.panels[i].data
                        );

                        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                            addItem.component
                        );
                        viewContainerRef.clear();

                        const componentRef = viewContainerRef.createComponent(
                            componentFactory
                        );
                        (componentRef.instance).data = addItem.data;
                    }
                });
            });
    }
}
