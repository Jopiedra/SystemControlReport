import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Title } from '@angular/platform-browser';

import { AppUser, RequestUserActivityData, UserActivity } from '../../models/AppUsers';

import { AppUsersService } from '../../services/appusers.service';


@Component({
    selector: 'AppUsersHistory'
    , templateUrl: 'history.component.html'
    , providers: [
        AppUsersService
    ]
    , styles: [
        `
            ::ng-deep .modal-dialog {
                max-width: 80% !important;
            }
            ::ng-deep .modal-content {
                max-height: 80% !important;
            }
            ::ng-deep .mat-form-field-wrapper {
                padding: 0;
            }
        `
    ]
})

export class AppUsersHistoryComponent implements OnInit, OnDestroy {

    public subs!: Subscription;
    public UserID!: number;
    public UserData: AppUser = new AppUser();
    public Activities: UserActivity[] = [];
    public RequestData: RequestUserActivityData = new RequestUserActivityData();
    public SearchByTop: boolean = true;
    filterInput = new FormControl();
    SearchInput = new FormControl();
    public TopValue: number = 100;
    filterTop = new FormControl();
    page = 1;
    pageSize = 10;
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      });
    
    constructor (
        private TitleSVC: Title
        , private AppUsersSVC: AppUsersService
        , private ActRout: ActivatedRoute
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
    ) {
        this.filterInput.setValue('Top');
        this.filterTop.setValue(this.TopValue);
     }

    open(Content: any) {
        this.Mod.open(Content);
    }  

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - User Activities");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;
        this.subs = this.ActRout.params.subscribe(params => {
            this.UserID = params["UserID"];           
            this.UpdateData();
        });


        this.filterInput.valueChanges.subscribe(
            res => {
                if(this.filterInput.value == 'Top') {
                    this.SearchByTop = true;
                } else {
                    this.SearchByTop = false;
                }
            }
        );

        this.SearchInput.valueChanges.pipe(
            debounceTime(200)
        ).subscribe(term => {
            //this.txtSearch = this.filterInput.value;
            this.Activities = this.UserData.Activities.filter(rsc => FilterData(rsc, term));
        });

        function FilterData(obj: UserActivity, term: string) {
            if (obj.TargetTable.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.Action.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.RoleAtTime.toLowerCase().indexOf(term.toLowerCase()) >= 0
            ) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    UpdateData() {
        if(this.SearchByTop) {
            this.RequestData = new RequestUserActivityData();
            this.RequestData.UserID = this.UserID;
            this.RequestData.Top = this.filterTop.value;            
        } else {
            this.RequestData = new RequestUserActivityData();
            this.RequestData.UserID = this.UserID;
            this.RequestData.StartDate =  this.range.controls.start.value;
            this.RequestData.EndDate = this.range.controls.end.value;
        }

        //console.log(this.RequestData);
        this.AppUsersSVC.UserActivities(this.RequestData).subscribe(
            res => {
                this.UserData = res;
                this.Activities = this.UserData.Activities;
                //console.log(this.UserData);
            }
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe;
    }
}