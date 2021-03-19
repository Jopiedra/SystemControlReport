import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { Department } from '../../models/Departments';

import { DepartmentService } from '../../services/departments.service';

@Component({
    selector: 'Departments'
    , templateUrl: 'departments.component.html'
    , providers: [
        DepartmentService
    ]    
})

export class DepartmentsComponent implements OnInit {

    public ModelList: Department[] = [];

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private DepartmentSVC: DepartmentService
    ) {}

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Servers");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        this.DepartmentSVC.List().subscribe(
            res => {
                this.ModelList = res;
               //console.log(this.ServerList);
            }
        );
    }

    ChangeStatus(DepartmentID: number) {
        let serverdetail = new Department();

        serverdetail.DepartmentID = DepartmentID;
        serverdetail.ActionType = 'CHGST';

        this.DepartmentSVC.Upsert(serverdetail,'UPDATE').subscribe(
            res => {
                if(res) {
                    this.ngOnInit();
                }
            }
        );
    }
}