import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { SharedFolder } from '../../models/SharedFolder';

import { SharedFoldersService } from '../../services/sharedfolders.service';

@Component({
    selector: 'SharedFolders'
    , templateUrl: 'sharedfolders.component.html'
    , providers: [
        SharedFoldersService
    ]    
})

export class SharedFoldersComponent implements OnInit {

    public ModelList: SharedFolder[] = [];
    public ModelListObs: SharedFolder[] = [];
    public txtSearch: string = '';
    filterInput = new FormControl();
    page = 1;
    pageSize = 10;

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private SharedFolderSVC: SharedFoldersService
    ) {}

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Shared Folders");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        this.SharedFolderSVC.List().subscribe(
            res => {
                this.ModelList = res;
                this.ModelListObs = this.ModelList;
               //console.log(this.ServerList);
            }
        );

        this.filterInput.valueChanges.pipe(
            debounceTime(200)
        ).subscribe(term => {
            this.txtSearch = this.filterInput.value;
            this.ModelListObs = this.ModelList.filter(rsc => FilterData(rsc, term));
        });

        /* Functions */
        function FilterData(obj: SharedFolder, term: string) {
            if (obj.Address.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    ChangeStatus(SFID: number) {
        let model = new SharedFolder();

        model.SFID = SFID;
        model.ActionType = 'CHGST';

        this.SharedFolderSVC.Upsert(model,'UPDATE').subscribe(
            res => {
                if(res) {
                    this.ngOnInit();
                }
            }
        );
    }

    CleanSearch() {
        this.txtSearch = '';
        this.filterInput.setValue('');
    }
}