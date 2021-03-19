import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { AppDirectory } from '../../models/AppDirectory';

import { AppDirectoryService } from '../../services/appdirectory.service';

@Component({
    selector: 'AppDirectory'
    , templateUrl: 'appdirectory.component.html'
    , providers: [
        AppDirectoryService
    ]
})

export class AppDirectoryComponent implements OnInit {
    title = 'SCR - App Directory';
    public Directory: AppDirectory[] = [];

    constructor(
        private TitleSVC: Title
        , private AppDirectorySVC: AppDirectoryService
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
    ) { }

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - App Directory");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;
        this.AppDirectorySVC.List().subscribe(
            res => {
                this.Directory = res;
                //console.log(this.Directory)
            }
        );
    }

    ChangeStatus(AppID: number) {
        let model = new AppDirectory();
        model.ApplicationID = AppID;
        model.ActionType = 'CHGST';

        this.AppDirectorySVC.Upsert(model, "Update").subscribe(
            res => {
                if(res) {
                    this.ngOnInit()
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