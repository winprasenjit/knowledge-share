import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../user/services/user.service';
import { ApiSettings } from '../_shared/constants/api.constant';
import { Category } from '../category/models/category';
import { ValidateConfirmPassword } from '../_shared/validators/confirm-password.validator';
import { MobileNumberValidation } from '../_shared/validators/mobile-number.validator';
import { User } from '../user/models/user.model';
import { AlertService } from '../_shared/services/alert.service';
import { CommunicationService } from '../_shared/services/communication.service';
import { CategoryService } from '../category/services/category.service';
import { HttpService } from '../_shared/services/http.service';
import { JqFunction } from '../_shared/helpers/jqFunction';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [UserService]
})
export class RegistrationComponent implements OnInit {
    uploadUrl = ApiSettings.USER_IMAGE_UPLOAD_URL;
    uploadImg: string;
    user: FormGroup;
    category: Category[] = [];
    subjectList = [];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private httpService: HttpService,
        private el: ElementRef,
        private userService: UserService,
        private alertService: AlertService,
        private communicationService: CommunicationService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.getCategoryData();
        this.user = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]], // , ValidateConfirmPassword('confirmPassword')
            confirmPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    ValidateConfirmPassword('password')
                ]
            ],
            sex: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            contact: this.fb.array([]),
            subject: [],
            isAgree: ['', [Validators.required]]
        });
        this.addContact();
    }

    initContact() {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, MobileNumberValidation]],
            aboutu: []
        });
    }

    addContact() {
        const control = this.user.controls.contact as FormArray;
        const addrCtrl = this.initContact();

        control.push(addrCtrl);

        /* //subscribe to individual address value changes
        addrCtrl.valueChanges.subscribe(x => {
            console.log(x);
        })*/
    }

    getCategoryData(): void {
        this.categoryService
            .getAllCategory()
            .subscribe((result: Category[]) => {
                this.subjectList = result;
                /*JqFunction.createSelectDropdown('#subject');
                 this.user.patchValue({
                    subject: [(this.subjectList[0] || {}).name]
                }); */
            });
    }

    onSubmit({ value, valid }: { value: User; valid: boolean }) {
        if (valid) {
            this.userService
                .createUser(this.user.value)
                .subscribe((result: User) => {
                    localStorage.setItem('currentUser', JSON.stringify(result));
                    this.alertService.success('User added');
                    this.router.navigate(['/dashboard']);
                    this.communicationService.setLoginType(true);
                });
        }
    }

    // the function which handles the file upload without using a plugin.
    upload() {
        // locate the file element meant for the file upload.
        const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
            '#photo'
        );
        // get the total amount of files attached to the file input.
        const fileCount: number = inputEl.files.length;
        // create a new fromdata instance
        const formData = new FormData();
        // check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) {
            // a file was selected
            // append the key name 'photo' with the first file in the element
            formData.append('photo', inputEl.files.item(0));
            // call the angular http method
            this.httpService
                // post the form data to the url defined above and map the response.
                // Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(this.uploadUrl, formData)
                .pipe(map(response => response))
                .subscribe(
                    // map the success function and alert the response
                    response => {
                        this.uploadImg =
                            ApiSettings.API_ENDPOINT + response.filePath;
                    },
                    error => console.log(error)
                );
        }
    }
}
