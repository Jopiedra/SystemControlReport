import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Department } from '../../models/Departments';

import { DepartmentService } from '../../services/departments.service';

@Component({
    selector: 'DepartmentUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        DepartmentService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class DepartmentUpsertComponent implements OnInit {

    public Model: Department = new Department();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private DepartmentSVC: DepartmentService
        , private FB: FormBuilder
    ) { }

    @Input() DepartmentDetails!: Department;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            Name: ['', Validators.compose([Validators.required])]            
        });
        if (this.DepartmentDetails != undefined) {
            this.isEdit = true;
            this.Model = this.DepartmentDetails;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.Name.setValue(this.DepartmentDetails.DepartmentName);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.DepartmentName = this.f.Name.value;
        
        //console.log(this.Model);
        this.DepartmentSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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