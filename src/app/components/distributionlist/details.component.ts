import { Component, Input, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { DLs } from '../../models/DLs';

import { DistributionListService } from '../../services/distributionlist.service';

@Component({
    selector: 'DistributionListDetails'
    , templateUrl: 'details.component.html'
    , providers: [
        DistributionListService
    ]
    , styles: [
        `
        ::ng-deep .ant-popover-title {
                background-color: darkgray !important;
            }
        ::ng-deep .cdk-overlay-container {
            z-index:1500 !important;
        }
        `
    ]
})

export class DistributionListDetailsComponent implements OnInit {

    public ModelList: DLs[] = [];
    public ModelListObs: DLs[] = [];
    public txtSearch: string = '';
    public Loading: boolean = true;
    filterInput = new FormControl();
    RecipientType = new FormControl();
    page = 1;
    pageSize = 10;

    @Input() RPTID!: number;

    constructor(
        private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private DLsSVC: DistributionListService
    ) { }

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        if (this.RPTID != undefined) {
            this.DLsSVC.Details(this.RPTID).subscribe(
                res => {
                    this.ModelList = res;
                    this.ModelListObs = this.ModelList;
                    this.Loading = false;
                }
            );
        } else {
            this.DLsSVC.List().subscribe(
                res => {
                    this.ModelList = res;
                    this.ModelListObs = this.ModelList;
                    this.Loading = false;
                }
            );
        }
        this.filterInput.valueChanges.pipe(
            debounceTime(200)
        ).subscribe(term => {
            this.page = 1;
            this.txtSearch = this.filterInput.value;
            this.ModelListObs = this.ModelList.filter(rsc => FilterData(rsc, term));
        });

        /* Functions */
        function FilterData(obj: DLs, term: string) {
            if (obj.FileName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.LogsFileName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.EmailSubjectName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.FullName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.Email.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    CleanSearch() {
        this.txtSearch = '';
        this.filterInput.setValue('');
    }

    UpdateDL(DL: DLs, NewRT: string) {
        let NewDL = new DLs();
        NewDL.ActionType = 'UPDATE';
        NewDL.DLID = DL.DLID;
        NewDL.RecipientType = NewRT;

        this.DLsSVC.Update(NewDL).subscribe(res => {
            if(res) {
                this.ngOnInit();
            } else {
                window.alert("An unexpected error occurred, try again!!!");
            }
        });
    }

    RemoveDL(DLID: number) {
        var x = confirm('Are you sure that you want remove this DL???')
        if(x){
            let NewDL = new DLs();
            NewDL.ActionType = 'DISABLE';
            NewDL.DLID = DLID;

            this.DLsSVC.Update(NewDL).subscribe(res => {
                if(res) {
                    this.ngOnInit();
                } else {
                    window.alert("An unexpected error occurred, try again!!!");
                }
            });
        }
    }
}