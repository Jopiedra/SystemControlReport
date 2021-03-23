import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { SourcePath } from '../../models/SourcePath';

import { SourcePathsService } from '../../services/sourcepaths.service';

@Component({
    selector: 'SourcePath'
    , templateUrl: 'sourcepath.component.html'
    , providers: [
        SourcePathsService
    ]    
})

export class SourcePathComponent implements OnInit {

    public ModelList: SourcePath[] = [];
    public ModelListObs: SourcePath[] = [];
    public txtSearch: string = '';
    filterInput = new FormControl();
    page = 1;
    pageSize = 10;

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private SourcePathsSVC: SourcePathsService
    ) {}

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Source Paths");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        this.SourcePathsSVC.List().subscribe(
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
        function FilterData(obj: SourcePath, term: string) {
            if (obj.Address.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    ChangeStatus(SFID: number) {
        let model = new SourcePath();

        model.SourceID = SFID;
        model.ActionType = 'CHGST';

        this.SourcePathsSVC.Upsert(model,'UPDATE').subscribe(
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