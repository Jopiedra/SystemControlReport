import { Component, Input, OnInit } from '@angular/core';

import { ActivityDetails } from '../../models/AppUsers';
import { AppUsersService } from '../../services/appusers.service';

@Component({
    selector: 'ActivityDetail'
    , templateUrl: 'activitydetail.component.html'
    , providers: [
        AppUsersService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class AppUsersActivityDetailComponent implements OnInit {

    public Details: ActivityDetails[] = [];
    constructor(
        private AppUsersSVC: AppUsersService
    ) { }

    @Input() ActivityID!: number;

    ngOnInit() {
        this.AppUsersSVC.ActivityDetails(this.ActivityID).subscribe(
            res => {
                this.Details = res;
                console.log(this.Details);
            }
        );
    }
}