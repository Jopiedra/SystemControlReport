import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { Computer } from '../../models/Computers';

import { ComputerService } from '../../services/computers.services';

@Component({
    selector: 'Computers'
    , templateUrl: 'computers.component.html'
    , providers: [
        ComputerService
    ]    
})

export class ComputersComponent implements OnInit {

    public CompList: Computer[] = [];

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private ComputerSVC: ComputerService
    ) {}

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Computers");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        this.ComputerSVC.List().subscribe(
            res => {
                this.CompList = res;
                console.log(this.CompList);
            }
        );
    }

    ChangeStatus(ComputerID: number) {
        let computer = new Computer();

        computer.ComputerID = ComputerID;
        computer.ActionType = 'CHGST';

        this.ComputerSVC.Upsert(computer,'UPDATE').subscribe(
            res => {
                if(res) {
                    this.ngOnInit();
                }
            }
        );
    }
}