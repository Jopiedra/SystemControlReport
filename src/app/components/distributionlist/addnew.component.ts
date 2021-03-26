import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { EmailDirectory } from '../../models/EmailDirectory';
import { Report } from '../../models/Report';
import { DLs, DLsRequest } from '../../models/DLs';

import { DistributionListService } from '../../services/distributionlist.service';
import { EmailDirectoryService } from '../../services/emaildirectory.service';
import { ReportsService } from '../../services/reports.service';

@Component({
    selector: 'DLAddNew'
    , templateUrl: 'addnew.component.html'
    , providers: [
        DistributionListService
        , EmailDirectoryService
        , ReportsService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }
        `
    ]
})

export class DLAddNewComponent implements OnInit {

    public ReportList: Report[] = [];
    RecipientList: EmailDirectory[] = [];
    public Model: DLs = new DLs();
    public loading: boolean = true;
    public isEdit!: boolean;
    public RPTIDForm!: FormControl;
    public NoSenders: boolean = true;
    RecipientsDirect = [];
    RecipientsCC = [];
    RecipientsBCC = [];
    
    constructor(
        private DLsSVC: DistributionListService
        , private ReportSVC: ReportsService
        , private EmailDirectorySVC: EmailDirectoryService
    ) { }

    @Input() RPTID!: number;

    ngOnInit() {
        this.RPTIDForm = new FormControl('', Validators.required);

        //console.log(this.Application);
        if(this.RPTID != undefined) {
            this.ReportSVC.Details(this.RPTID).subscribe(res => {
                this.ReportList = this.ReportList.concat(res);
                //console.log(this.ReportList);
                this.RPTIDForm.setValue(this.ReportList[0].RPTID);
                this.loading = false;
            })
        } else {
            this.ReportSVC.List().subscribe(res =>{
                this.ReportList = res.filter(src => src.Status);
                this.RPTIDForm.setValue(this.ReportList[0].RPTID);
                this.loading = false;
            });
        }        

        this.EmailDirectorySVC.List().subscribe(res => {
            this.RecipientList = res.filter(src => src.Status);
        });        
    }

    onSubmit() {
        // console.log(this.RPTIDForm);
        // console.log(this.RecipientsDirect);
        // console.log(this.RecipientsCC);
        // console.log(this.RecipientsBCC);
        let NewDL = new DLsRequest();
        NewDL.RPTID = this.RPTIDForm.value;
        NewDL.RecipientsDirect = this.RecipientsDirect;
        NewDL.RecipientsCC = this.RecipientsCC;
        NewDL.RecipientsBCC = this.RecipientsBCC;
        
        this.DLsSVC.AddNew(NewDL).subscribe(res => {
            if(res) {
                window.location.reload();
            } else {
                window.alert("An unexpected error occurred, try again!!!");
            }
        });
    }

    ngAfterContentChecked() {
        if(this.RecipientsDirect.length>0 || this.RecipientsCC.length>0 || this.RecipientsBCC.length>0){
            this.NoSenders = false;
        } else {
            this.NoSenders = true;
        }
    }
    
}