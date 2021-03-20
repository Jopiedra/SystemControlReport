import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Report } from '../../models/Report';

import { ReportsService } from '../../services/reports.service';

@Component({
    selector: 'ReportUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        ReportsService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class ReportsUpsertComponent implements OnInit, OnDestroy {

    public Model: Report = new Report();
    public Form!: FormGroup;
    public Loading: boolean = true;
    public isEdit!: boolean;
    public subs!: Subscription;
    public ActionType!: string;
    public SubTitle!: string;
    public RPTID!: number;
    
    constructor(
        private ReportsSVC: ReportsService
        , private ActRout: ActivatedRoute
        , private FB: FormBuilder
    ) { }

    ngOnInit() {
        this.subs = this.ActRout.params.subscribe(params => {
            this.ActionType = params["Type"];
            this.RPTID = params["RPTID"];        
            this.Loading = false;      
            
            switch(params["Type"]) {
                case 'AddNew': this.SubTitle = "Add New Report";
                break;
                case 'Edit': this.SubTitle = "Edit Report Information";
                break;
                default: this.SubTitle = "Reports Details";
            }
        });

        //console.log(this.Application);
        // this.Form = this.FB.group({
        //     Address: ['', Validators.compose([Validators.required])]            
        // });
        // if (this.SharedFolderDetails != undefined) {
        //     this.isEdit = true;
        //     this.Model = this.SharedFolderDetails;
        //     this.Model.ActionType = 'UPDATE';
        //     this.Form.controls.Address.setValue(this.SharedFolderDetails.Address);
        // }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        // this.loading = true;

        // this.Model.Address = this.f.Address.value;
        
        // //console.log(this.Model);
        // this.SharedFolderSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
        //     res => {
        //         if (res) {
        //             window.location.reload();
        //         } else {
        //             window.alert("An unexpected error occurred, try again!!!");
        //         }
        //     },
        //     error => {
        //         console.log(error);
        //         window.alert("An unexpected error occurred, try again!!!");
        //     }
        // );
    }

    ngOnDestroy() {
        this.subs.unsubscribe;
    }
}