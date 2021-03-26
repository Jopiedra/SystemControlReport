import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'DistributionList'
    , templateUrl: 'distributionlist.component.html'
    , providers: [ ]
    , styles: [
        `
        ::ng-deep .ant-popover-title {
                background-color: darkgray !important;
            }
        `
    ]
})

export class DistributionListComponent implements OnInit {

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
    ) { }

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Distribution List");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;        
    }
}