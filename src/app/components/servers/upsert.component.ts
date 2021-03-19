import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Server } from '../../models/Server';

import { ServerService } from '../../services/servers.services';

@Component({
    selector: 'ServerUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        ServerService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class ServerUpsertComponent implements OnInit {

    public Model: Server = new Server();
    public Form!: FormGroup;
    public loading!: boolean;
    public isEdit!: boolean;

    constructor(
        private ServerSVC: ServerService
        , private FB: FormBuilder
    ) { }

    @Input() ServerDetail!: Server;

    ngOnInit() {
        //console.log(this.Application);
        this.Form = this.FB.group({
            ServerName: ['', Validators.compose([Validators.required])],
            IPAddress: [''],
            ServerType: ['', Validators.compose([Validators.required])]        
        });
        if (this.ServerDetail != undefined) {
            this.isEdit = true;
            this.Model = this.ServerDetail;
            this.Model.ActionType = 'UPDATE';
            this.Form.controls.ServerName.setValue(this.ServerDetail.ServerName);
            this.Form.controls.IPAddress.setValue(this.ServerDetail.IPAddress);
            this.Form.controls.ServerType.setValue(this.ServerDetail.ServerType);
        }
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.loading = true;

        this.Model.ServerName = this.f.ServerName.value;
        this.Model.IPAddress = this.f.IPAddress.value;
        this.Model.ServerType = this.f.ServerType.value;
        
        //console.log(this.Model);
        this.ServerSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
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