import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Roles } from '../../models/Roles';

import { RolesService } from '../../services/roles.services';

@Component({
    selector: 'RoleCreate'
    , templateUrl: 'create.component.html'
    , providers: [
        RolesService
    ]
})

export class RolesCreateComponent implements OnInit {

    public NewRole: Roles = new Roles();
    public Form!: FormGroup;
    public loading!: boolean;
    maxLength: number = 200;
    CountChars: number = this.maxLength;

    constructor(
        private RolesSVC: RolesService
        , private FB: FormBuilder
    ) { }
    
    ngOnInit() {   
        this.Form = this.FB.group({
            RoleName: ['', Validators.compose([Validators.required])]
            , RoleDescription: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxLength)])]
        }); 
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.NewRole.RoleName = this.f.RoleName.value;
        this.NewRole.RoleDescription = this.f.RoleDescription.value;

        this.RolesSVC.Create(this.NewRole).subscribe(
            res => {
                if(res) {
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

    CountCharsLeft() {
        this.CountChars = this.maxLength - this.f.RoleDescription.value.length;
    }
}