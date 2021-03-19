import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Computer } from '../../models/Computers';

import { ComputerService } from '../../services/computers.services';

@Component({
    selector: 'ComputerUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        ComputerService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class ComputerUpsertComponent implements OnInit {

    public Model: Computer = new Computer();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private ComputerSVC: ComputerService
        , private FB: FormBuilder
    ) { }

    @Input() ComputerDetail!: Computer;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            ComputerName: ['', Validators.compose([Validators.required])],
            IPAddress: ['']        
        });
        if (this.ComputerDetail != undefined) {
            this.isEdit = true;
            this.Model = this.ComputerDetail;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.ComputerName.setValue(this.ComputerDetail.ComputerName);
            this.Form.controls.IPAddress.setValue(this.ComputerDetail.IPAddress);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.ComputerName = this.f.ComputerName.value;
        this.Model.IPAddress = this.f.IPAddress.value;
        
        //console.log(this.Model);
        this.ComputerSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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