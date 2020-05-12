import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { Router } from '@angular/router';
import { Column } from '../../_shared/models/column.model';
import { GridComponent } from '../../_shared/components/grid/components/grid.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    columnLoaded = false;
    users: User[] = [];
    column: Column[];
    selectedItems: User;
    rowIndex: number;

    @ViewChild(GridComponent) gridComponent: GridComponent;

    constructor(
        private userService: UserService,
        private router: Router,
        public dialog: NgbModal
    ) {}

    ngOnInit(): void {
        this.getUserColumn();
        this.getUserData();
    }

    getUserColumn(): void {
        const self = this;
        this.userService.getColumns().subscribe((data: Column[]) => {
            data[0].callBack = (row: User): string => {
                if (row) {
                    const htmlString =
                        '<a href="javascript:void(0)" >' +
                        row.firstname +
                        ' ' +
                        row.lastname +
                        '</a>';
                    return htmlString;
                }
            };
            data[0].onClick = (item: User, column, r, c) => {
                self.userService.selectedUser = item;
                self.router.navigate(['/user/view-user', item._id]);
            };
            data[5].callBack = (row: User): number => {
                if (row && row.rating) {
                    return Math.round(
                        Number(
                            row.rating.communication +
                                row.rating.attitude +
                                row.rating.sense
                        ) / 3
                    );
                }
            };
            this.column = data;
            this.columnLoaded = true;
        });
    }

    getUserData(): void {
        this.userService.getAllUser().subscribe((result: User[]) => {
            this.users = result;
        });
    }

    createFullName(firstname: string, lastname: string): string {
        return firstname + ' ' + lastname;
    }

    createRating(ratingObj: any): number {
        return (
            Number(
                ratingObj.communication + ratingObj.attitude + ratingObj.sense
            ) / 3
        );
    }

    createUser(): void {
        const dialogRef = this.dialog.open(UserFormComponent);
        /* dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.users.push(result);
                this.gridComponent.addRow(result);
            }
        }); */
    }

    updateUser(): void {
        const dialogRef = this.dialog.open(UserFormComponent);
        dialogRef.componentInstance.data = this.selectedItems;
        /* dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.gridComponent.updateRow(result, this.rowIndex);
            }
        }); */
    }

    deleteUser(): void {
        this.userService
            .deleteUser(this.selectedItems.username)
            .subscribe((result: any) => {
                if (result.success) {
                    this.gridComponent.removeRow(this.rowIndex);
                }
            });
    }

    trackEvent(event: any): void {
        this.selectedItems = null;
        this.rowIndex = null;
        if (event.selection && event.selection.selected) {
            this.selectedItems = event.selection.items;
            this.rowIndex = event.selection.selectedIndex;
        }
    }
}
