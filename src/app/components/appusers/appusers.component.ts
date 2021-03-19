import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { AppUser } from '../../models/AppUsers';

import { AuthenticationService } from '../../services/authentication.service';
import { AppUsersService } from '../../services/appusers.service';

@Component({
    selector: 'AppUsers'
    , templateUrl: 'appusers.component.html'
    , providers: [
        AuthenticationService
        , AppUsersService
    ]
    , styles: [
        `
            ::ng-deep .modal-content {
                max-height: 80% !important;
            }
        `
    ]
})

export class AppUsersComponent implements OnInit {

    public UserList: AppUser[] = [];
    public UserData: AppUser = new AppUser();
    public IsAuditor!: boolean;

    constructor(
        private TitleSVC: Title
        , private AuthSVC: AuthenticationService
        , private AppUsersSVC: AppUsersService
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
        this.AppUsersSVC.List().subscribe(
            res => {
                this.UserList = res;
                //console.log(this.UserList);
            }
        );
        this.UserData = this.AuthSVC.currentUserValue;
        if(this.UserData.RoleName == 'Application Auditor') {
            this.IsAuditor = true;
        }
    }

    ChangeStatus(UserID: number) {
        let User = new AppUser();
        User.UserID = UserID;
        User.ActionType = 'CHGST';

        this.AppUsersSVC.Upsert(User, "Update").subscribe(
            res => {
                if (res) {
                    this.ngOnInit();
                } else {
                    window.alert("An unexpected error occurred, try again!!!");
                }
            },
            error => {
                console.log(error);
                window.alert("An unexpected error occurred, try again!!!");
            }
        )
    }
}