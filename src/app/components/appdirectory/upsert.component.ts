import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppDirectory } from '../../models/AppDirectory';
import { AppDirectoryService } from '../../services/appdirectory.service';

@Component({
    selector: 'AppDirectoryUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        AppDirectoryService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class AppDirectoryUpsertComponent implements OnInit {

    public Directory: AppDirectory[] = [];
    public Model: AppDirectory = new AppDirectory();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private AppDirectorySVC: AppDirectoryService
        , private FB: FormBuilder
    ) { }

    @Input() Application!: AppDirectory;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            mainClass: ['', Validators.compose([Validators.required])],
            appName: ['', Validators.compose([Validators.required])],
            controller: ['', Validators.compose([Validators.required])],
            page: [''],
            parameter: [''],
            logo: [''],
            order: ['', Validators.compose([Validators.required])]
        })
        if (this.Application != undefined) {
            this.isEdit = true;
            this.Model = this.Application;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.mainClass.setValue(this.Application.MainClass);
            this.Form.controls.appName.setValue(this.Application.AppName);
            this.Form.controls.controller.setValue(this.Application.Controller);
            this.Form.controls.page.setValue(this.Application.Page);
            this.Form.controls.parameter.setValue(this.Application.Parameter);
            this.Form.controls.logo.setValue(this.Application.Logo);
            this.Form.controls.order.setValue(this.Application.Order);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.MainClass = this.f.mainClass.value;
        this.Model.AppName = this.f.appName.value;
        this.Model.Controller = this.f.controller.value;
        this.Model.Page = this.f.page.value ? this.f.page.value : 'Index';
        this.Model.Parameter = this.f.parameter.value;
        this.Model.Logo = this.f.logo.value;
        this.Model.Order = this.f.order.value;
        this.Model.ActiveFlag = true;

        //console.log(this.Model);
        this.AppDirectorySVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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