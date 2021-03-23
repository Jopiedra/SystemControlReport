import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { Report } from '../../models/Report';
import { Computer } from '../../models/Computers';
import { Server } from '../../models/Server';
import { SharedFolder } from '../../models/SharedFolder';
import { SourcePath } from '../../models/SourcePath';
import { Department } from '../../models/Departments';
import { EmailDirectory } from '../../models/EmailDirectory';

import { ReportsService } from '../../services/reports.service';
import { ComputerService } from '../../services/computers.services';
import { ServerService } from '../../services/servers.services';
import { SharedFoldersService } from '../../services/sharedfolders.service';
import { SourcePathsService } from '../../services/sourcepaths.service';
import { DepartmentService } from '../../services/departments.service';
import { EmailDirectoryService } from '../../services/emaildirectory.service';

@Component({
    selector: 'ReportUpsert'
    , templateUrl: 'upsert.component.html'
    , providers: [
        ReportsService
        , ComputerService
        , ServerService
        , SharedFoldersService
        , SourcePathsService
        , DepartmentService
        , EmailDirectoryService
    ]
    , styles: [
        `
        ::ng-deep .mat-form-field-wrapper {
                padding: 0 !important;
            }

        ::ng-deep .mat-form-field-subscript-wrapper {
                position: inherit !important;
            }
        ::ng-deep .mat-form-field-underline {
                position: initial !important;
            }
        `
    ]
})

export class ReportsUpsertComponent implements OnInit, OnDestroy {

    public Model: Report = new Report();
    public Form!: FormGroup;
    public Loading!: boolean;
    public isEdit!: boolean;
    public isRead!: boolean;
    public subs!: Subscription;
    public ActionType!: string;
    public SubTitle!: string;
    public RPTID!: number;
    public SFFlag: boolean = false;
    public EmailFlag: boolean = false;

    public CompList: Computer[] = [];
    public ServerList: Server[] = [];
    public SPathList: SourcePath[] = [];
    public SFolderList: SharedFolder[] = [];
    public DepList: Department[] = [];
    public BSList: EmailDirectory[] = [];
    public FreqList = [{ id: 1, value: 'Daily' }, { id: 2, value: 'Weekly' }, { id: 3, value: 'Monthly' }, { id: 4, value: 'One Time' }, { id: 5, value: 'On Demand' }]
    public DMList: string[] = ['Email', 'Shared Folder', 'Email & Shared Folder', 'Live Link Report', 'No Apply']

    constructor(
        private TitleSVC: Title
        , private ReportsSVC: ReportsService
        , private ComputerSVC: ComputerService
        , private ServerSVC: ServerService
        , private SharedFolderSVC: SharedFoldersService
        , private SourcePathSVC: SourcePathsService
        , private DepartmentSVC: DepartmentService
        , private EmailDirectorySVC: EmailDirectoryService
        , private ActRout: ActivatedRoute
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private FB: FormBuilder
        , private router: Router
    ) { }

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Reports");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        this.subs = this.ActRout.params.subscribe(params => {
            this.ActionType = params["Type"];
            this.RPTID = params["RPTID"];
            this.Loading = false;

            switch (params["Type"]) {
                case 'AddNew': {
                    this.SubTitle = "Add New Report";
                    this.isEdit = false;
                    this.isRead = false;
                }
                    break;
                case 'Edit': {
                    this.SubTitle = "Edit Report Information";
                    this.isEdit = true;
                    this.isRead = false;
                }
                    break;
                default: {
                    this.SubTitle = "Reports Details";
                    this.isEdit = false;
                    this.isRead = true;
                }
            }
            this.ComputerSVC.List().subscribe(res => {
                this.CompList = res.filter(src => src.Status === true);
            }
            );
            this.ServerSVC.List().subscribe(res => {
                this.ServerList = res.filter(src => src.Status === true);
            });

            this.SharedFolderSVC.List().subscribe(res => {
                this.SFolderList = res.filter(src => src.Status === true);                
            });

            this.SourcePathSVC.List().subscribe(res => {
                this.SPathList = res.filter(src => src.Status === true);
            });

            this.DepartmentSVC.List().subscribe(res => {
                this.DepList = res.filter(src => src.Status === true);
            });

            this.EmailDirectorySVC.List().subscribe(res => {
                this.BSList = res.filter(src => src.Status === true);
            });
        });

        this.Form = this.FB.group({
            FileName: ['', Validators.compose([Validators.required])],
            LogFileName: [''],
            EmailSubjectName: [''],
            ComputerAssigned: ['', Validators.compose([Validators.required])],
            ServerAssigned: ['', Validators.compose([Validators.required])],
            SourcePath: ['', Validators.compose([Validators.required])],
            Department: ['', Validators.compose([Validators.required])],
            BusinessSponsor: ['', Validators.compose([Validators.required])],
            Frequency: ['', Validators.compose([Validators.required])],
            DeliveryMethod: ['', Validators.compose([Validators.required])],
            SharedFolder: [''],
            Notes: ['']
        });

        if (this.isEdit || this.isRead) {
            this.ReportsSVC.Details(this.RPTID).subscribe(res => {
                this.Model = res;
                console.log(res);
                this.Form.controls.FileName.setValue(this.Model.FileName);
                this.Form.controls.LogFileName.setValue(this.Model.LogsFileName);
                this.Form.controls.EmailSubjectName.setValue(this.Model.EmailSubjectName);
                this.Form.controls.ComputerAssigned.setValue(this.Model.ComputerAssignedID);
                this.Form.controls.ServerAssigned.setValue(this.Model.ServerAssignedID);
                this.Form.controls.SourcePath.setValue(this.Model.SourceID);
                this.Form.controls.Department.setValue(this.Model.DepID);
                this.Form.controls.BusinessSponsor.setValue(this.Model.BSID);
                this.Form.controls.Frequency.setValue(this.Model.FreqID);
                this.Form.controls.DeliveryMethod.setValue(this.Model.DeliveryMethod);
                this.Form.controls.SharedFolder.setValue(this.Model.SharedFolderID);
                this.Form.controls.Notes.setValue(this.Model.Note);
            });
        }

        this.Form.controls.DeliveryMethod.valueChanges.subscribe(res => {
            switch (res) {
                case 'Email': {
                    this.EmailFlag = true;
                    this.SFFlag = false;
                    this.Form.controls.SharedFolder.reset();
                }
                    break;
                case 'Shared Folder': {
                    this.EmailFlag = false;
                    this.SFFlag = true;
                    this.Form.controls.EmailSubjectName.reset();
                }
                    break;
                case 'Email & Shared Folder': {
                    this.EmailFlag = true;
                    this.SFFlag = true;
                }
                    break;
                default: {
                    this.EmailFlag = false;
                    this.SFFlag = false;
                    this.Form.controls.EmailSubjectName.reset();
                    this.Form.controls.SharedFolder.reset();
                }
            }
        });
    }

    get f() { return this.Form.controls; }

    onSubmit() {
        this.Loading = true;

        this.Model.FileName = this.Form.controls.FileName.value;
        this.Model.LogsFileName = this.Form.controls.LogFileName.value;
        //this.Model.FileName = this.Form.controls.EmailSubjectName.value;
        this.Model.ComputerAssignedID = this.Form.controls.ComputerAssigned.value;
        this.Model.ServerAssignedID = this.Form.controls.ServerAssigned.value;
        this.Model.SourceID = this.Form.controls.SourcePath.value;
        this.Model.DepID = this.Form.controls.Department.value;
        this.Model.BSID = this.Form.controls.BusinessSponsor.value;
        this.Model.FreqID = this.Form.controls.Frequency.value;
        this.Model.DeliveryMethod = this.Form.controls.DeliveryMethod.value;
        //this.Model.SharedFolderID = this.Form.controls.SharedFolder.value;
        this.Model.Note = this.Form.controls.Notes.value;
        this.Model.ActionType = this.ActionType;
        
        switch (this.Model.DeliveryMethod) {
            case 'Email': {
                this.Model.SharedFolderID = undefined;
                this.Model.FileName = this.Form.controls.EmailSubjectName.value;
            }
                break;
            case 'Shared Folder': {
                this.Model.EmailSubjectName = '';
                this.Model.SharedFolderID = this.Form.controls.SharedFolder.value;
            }
                break;
            case 'Email & Shared Folder': {
                this.Model.FileName = this.Form.controls.EmailSubjectName.value;
                this.Model.SharedFolderID = this.Form.controls.SharedFolder.value;
            }
                break;
            default: {
                this.Model.SharedFolderID = undefined;
                this.Model.EmailSubjectName = '';
            }
        }

        console.log(this.Model);
        this.ReportsSVC.Upsert(this.Model, this.isEdit ? 'Update' : 'AddNew').subscribe(
             res => {
                if (res) {
                    this.ForHomePage();
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

    UpdateDM() {
        console.log(this.f.DeleiveryMethod.value);
    }

    ngOnDestroy() {
        this.subs.unsubscribe;
    }

    ForHomePage(): void {
        if(this.isEdit) {
            this.router.navigate(['/Reports/Details/' + this.RPTID]).then(() => window.location.reload());        
        } else {
            this.ReportsSVC.List().subscribe(res => {
                const xID = res.filter(src => src.FileName === this.Model.FileName)
                this.router.navigate(['/Reports/Details/' + xID[0].RPTID]).then(() => window.location.reload());        
            })
        }
    }

    ClosePage(): void{
        this.router.navigate(['/Reports']);
    }
}