import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppUser } from '../../models/AppUsers';
import { AuthenticationService } from '../../services/authentication.service';
import { UserIdleService } from 'angular-user-idle';

declare var $: any;

@Component({
    selector: 'MainHeader'
    , templateUrl: 'header.component.html'
    , providers: [
        AuthenticationService
        , UserIdleService
    ]
})

export class MainHeaderComponent implements OnInit {

    public IsAuth!: boolean;
    public UserData: AppUser = new AppUser();
    public isVisible: boolean = false;

    @ViewChild('ModalTimer') MyModal!: ElementRef;

    constructor(
        private router: Router
        , private AuthSVC: AuthenticationService
        , private Idle: UserIdleService
    ) { 
        this.UserData = this.AuthSVC.currentUserValue;
        if (this.UserData.UserID > 0) {
            this.IsAuth = true;            
        }
    }   

    @Input() IsPopup!: boolean;

    ngOnInit() {      
        if (this.UserData.UserID > 0) {
            var TokenCreationDate = new Date(this.UserData.TokenCreationDate);
            var UpdateDate = new Date(TokenCreationDate.getTime() + (this.UserData.TokenExpiresMin * 60 * 1000));


            if (UpdateDate < new Date()) {
                this.AuthSVC.logout();
                location.reload();
            }

            if (this.UserData.ActiveFlag == true) {
                this.Idle.startWatching();

                // Start watching when user idle is starting.
                this.Idle.onTimerStart().subscribe(count => {
                    console.log(count);
                    this.isVisible = true;
                });

                // Start watch when time is up.
                this.Idle.onTimeout().subscribe(() => {
                    this.AuthSVC.logout();
                    location.reload();
                });
            }
        }
    }

    Logout() {
        this.AuthSVC.logout();
    }

    RestartTimer() {
        this.isVisible = false;
        this.Idle.resetTimer();
    }

}