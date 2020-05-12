import { Component, OnInit, Inject, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../../category/services/category.service';
import { Category } from '../../../category/models/category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    isUpdate = false;
    user: User;
    subjectList: Category[] = [];
    submitted = false;

    @Input() data;

    constructor(
        public activeModal: NgbActiveModal,
        private categoryService: CategoryService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getCategoryData();
        if (!this.data) {
            this.user = new User({});
            return;
        }
        this.isUpdate = true;
        this.user = new User(this.data);
    }

    onSubmit(form): void {
        this.user.subject = form.subject;
        this.user.createFullName();
        if (!this.isUpdate) {
            this.saveUser();
        } else {
            this.updateUser();
        }
    }

    saveUser(): void {
        this.userService.createUser(this.user).subscribe((result: User) => {
            this.activeModal.close(result);
        });
    }

    updateUser(): void {
        this.userService.updateUser(this.user).subscribe((result: User) => {
            this.activeModal.close(result);
        });
    }

    getSliderVal(event, type): void {
        this.user.rating[type] = event.value;
    }

    getCategoryData(): void {
        this.categoryService
            .getAllCategory()
            .subscribe((result: Category[]) => {
                this.subjectList = result;
            });
    }
}
