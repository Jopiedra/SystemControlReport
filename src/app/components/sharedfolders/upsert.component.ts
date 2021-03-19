import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedFolder } from '../../models/SharedFolder';

import { SharedFoldersService } from '../../services/sharedfolders.service';

@Component({
    selector: 'SharedFolderUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        SharedFoldersService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class SharedFolderUpsertComponent implements OnInit {

    public Model: SharedFolder = new SharedFolder();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private SharedFolderSVC: SharedFoldersService
        , private FB: FormBuilder
    ) { }

    @Input() SharedFolderDetails!: SharedFolder;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            Address: ['', Validators.compose([Validators.required])]            
        });
        if (this.SharedFolderDetails != undefined) {
            this.isEdit = true;
            this.Model = this.SharedFolderDetails;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.Address.setValue(this.SharedFolderDetails.Address);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.Address = this.f.Address.value;
        
        //console.log(this.Model);
        this.SharedFolderSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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