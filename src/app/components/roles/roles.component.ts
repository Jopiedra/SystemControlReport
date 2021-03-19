import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { Roles } from '../../models/Roles';

import { RolesService } from '../../services/roles.services';

@Component({
    selector: 'Roles'
    , templateUrl: 'roles.component.html'
    , providers: [
        RolesService
    ]
    , styles: [
        `
            ::ng-deep .modal-content {
                max-height: 80% !important;
            }
        `
    ]
})

export class RolesComponent implements OnInit {

    public RList: Roles[] = [];

    constructor(
        private TitleSVC: Title
        , private RolesSVC: RolesService
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
    ) { }

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Roles");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;
        this.RolesSVC.List().subscribe(
            res => {
                this.RList = res;
                //console.log(this.RList);
            }
        );
    }
}