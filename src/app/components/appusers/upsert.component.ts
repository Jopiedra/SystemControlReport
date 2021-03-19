import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppUser } from '../../models/AppUsers';
import { Roles } from '../../models/Roles';

import { AppUsersService } from '../../services/appusers.service';
import { RolesService } from '../../services/roles.services';

@Component({
    selector: 'AppUsersUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        AppUsersService
        , RolesService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class AppUsersUpsertComponent implements OnInit {

    public RoleList: Roles[] = [];
    public Model: AppUser = new AppUser();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private AppUsersSVC: AppUsersService
        , private RolesSVC: RolesService
        , private FB: FormBuilder
    ) { }

    @Input() User!: AppUser;

    ngOnInit() {
        //console.log(this.Application);
        this.RolesSVC.List().subscribe(
            res => {
                this.RoleList = res;
            }
        );
        this.Form = this.FB.group({
            UserName: ['', Validators.compose([Validators.required])],
            FullName: ['', Validators.compose([Validators.required])],
            RoleID: ['', Validators.compose([Validators.required])]            
        });
        if (this.User != undefined) {
            this.isEdit = true;
            this.Model = this.User;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.UserName.setValue(this.User.UserName);
            this.Form.controls.FullName.setValue(this.User.FullName);
            this.Form.controls.RoleID.setValue(this.User.RoleID);            
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.UserName = this.f.UserName.value;
        this.Model.FullName = this.f.FullName.value;
        this.Model.RoleID = this.f.RoleID.value;        

        //console.log(this.Model);
        this.AppUsersSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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