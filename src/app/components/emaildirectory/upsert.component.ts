import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailDirectory } from '../../models/EmailDirectory';

import { EmailDirectoryService } from '../../services/emaildirectory.service';

@Component({
    selector: 'EmailDirectoryUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        EmailDirectoryService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class EmailDirectoryUpsertComponent implements OnInit {

    public Model: EmailDirectory = new EmailDirectory();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private EmailDirectorySVC: EmailDirectoryService
        , private FB: FormBuilder
    ) { }

    @Input() EmailDirectoryDetail!: EmailDirectory;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            FullName: ['', Validators.compose([Validators.required])],
            Email: ['', Validators.compose([Validators.required, Validators.email])],
            Category: ['', Validators.compose([Validators.required])]        
        });
        if (this.EmailDirectoryDetail != undefined) {
            this.isEdit = true;
            this.Model = this.EmailDirectoryDetail;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.FullName.setValue(this.EmailDirectoryDetail.FullName);
            this.Form.controls.Email.setValue(this.EmailDirectoryDetail.Email);
            this.Form.controls.Category.setValue(this.EmailDirectoryDetail.Category);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.FullName = this.f.FullName.value;
        this.Model.Email = this.f.Email.value;
        this.Model.Category = this.f.Category.value;
        
        //console.log(this.Model);
        this.EmailDirectorySVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
            res => {
                if (res) {
                    window.location.reload();
                } else {
                    window.alert("An unexpected error occurred, try again!!!");
                }
            },
            error => {
                console.log(error);
                window.alert("An unexpected error occurred, try again!!!");
            }
        );
    }
}