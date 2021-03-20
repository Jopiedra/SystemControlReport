import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Report } from '../../models/Report';

import { ReportsService } from '../../services/reports.service';

@Component({
    selector: 'Reports'
    , templateUrl: 'reports.component.html'
    , providers: [
        ReportsService
    ]    
})

export class ReportsComponent implements OnInit {

    public ModelList: Report[] = [];
    public ModelListObs: Report[] = [];
    public txtSearch: string = '';
    public Loading: boolean = true;
    filterInput = new FormControl();
    page = 1;
    pageSize = 10;

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private ReportSVC: ReportsService
    ) {}

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Reports");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;
        
        this.ReportSVC.List().subscribe(
            res => {
                this.ModelList = res;
                this.ModelListObs = this.ModelList;
                this.Loading = false;
            }
        );

        this.filterInput.valueChanges.pipe(
            debounceTime(200)
        ).subscribe(term => {
            this.txtSearch = this.filterInput.value;
            this.ModelListObs = this.ModelList.filter(rsc => FilterData(rsc, term));
        });

        /* Functions */
        function FilterData(obj: Report, term: string) {
            if (obj.FileName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.LogsFileName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.EmailSubjectName.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    ChangeStatus(RPTID: number) {
        let model = new Report();

        model.RPTID = RPTID;
        model.ActionType = 'CHGST';

        this.ReportSVC.Upsert(model,'UPDATE').subscribe(
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