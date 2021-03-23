import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SourcePath } from '../../models/SourcePath';

import { SourcePathsService } from '../../services/sourcepaths.service';

@Component({
    selector: 'SourcePathUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        SourcePathsService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class SourcePathUpsertComponent implements OnInit {

    public Model: SourcePath = new SourcePath();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private SourcePathsSVC: SourcePathsService
        , private FB: FormBuilder
    ) { }

    @Input() SPathDetails!: SourcePath;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            Address: ['', Validators.compose([Validators.required])]            
        });
        if (this.SPathDetails != undefined) {
            this.isEdit = true;
            this.Model = this.SPathDetails;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.Address.setValue(this.SPathDetails.Address);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.Address = this.f.Address.value;
        
        //console.log(this.Model);
        this.SourcePathsSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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