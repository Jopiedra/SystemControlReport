import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { Server } from '../../models/Server';

import { ServerService } from '../../services/servers.services';

@Component({
    selector: 'Servers'
    , templateUrl: 'servers.component.html'
    , providers: [
        ServerService
    ]    
})

export class ServersComponent implements OnInit {

    public ServerList: Server[] = [];

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private ServerSVC: ServerService
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

        this.ServerSVC.List().subscribe(
            res => {
                this.ServerList = res;
               //console.log(this.ServerList);
            }
        );
    }

    ChangeStatus(ServerID: number) {
        let serverdetail = new Server();

        serverdetail.ServerID = ServerID;
        serverdetail.ActionType = 'CHGST';

        this.ServerSVC.Upsert(serverdetail,'UPDATE').subscribe(
            res => {
                if(res) {
                    this.ngOnInit();
                }
            }
        );
    }
}