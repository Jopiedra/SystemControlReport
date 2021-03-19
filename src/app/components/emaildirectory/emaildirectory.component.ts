import { Component, OnInit } from '@angular/core'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { EmailDirectory } from '../../models/EmailDirectory';

import { EmailDirectoryService } from '../../services/emaildirectory.service';

@Component({
    selector: 'EmailDirectory'
    , templateUrl: 'emaildirectory.component.html'
    , providers: [
        EmailDirectoryService
    ]    
})

export class EmailDirectoryComponent implements OnInit {

    public EDList: EmailDirectory[] = [];
    public EDListObs: EmailDirectory[] = [];
    public txtSearch: string = '';
    filterInput = new FormControl();
    page = 1;
    pageSize = 10;

    constructor(
        private TitleSVC: Title
        , private ModConfig: NgbModalConfig
        , private Mod: NgbModal
        , private EmailDirectorySVC: EmailDirectoryService
    ) {}

    open(Content: any) {
        this.Mod.open(Content);
    }

    ngOnInit() {
        this.TitleSVC.setTitle("SCR - Email Directory");
        this.ModConfig.backdrop = 'static';
        this.ModConfig.keyboard = false;
        this.ModConfig.centered = true;
        this.ModConfig.scrollable = true;

        this.EmailDirectorySVC.List().subscribe(
            res => {
                this.EDList = res;
                this.EDListObs = this.EDList;
               //console.log(this.ServerList);
            }
        );

        this.filterInput.valueChanges.pipe(
            debounceTime(200)
        ).subscribe(term => {
            this.txtSearch = this.filterInput.value;
            this.EDListObs = this.EDList.filter(rsc => FilterData(rsc, term));
        });

        /* Functions */
        function FilterData(obj: EmailDirectory, term: string) {
            if (obj.FullName.toLowerCase().indexOf(term.toLowerCase()) >= 0
                || obj.Email.toLowerCase().indexOf(term.toLowerCase()) >= 0
            ) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    ChangeStatus(ServerID: number) {
        let ED = new EmailDirectory();

        ED.RecipientID = ServerID;
        ED.ActionType = 'CHGST';

        this.EmailDirectorySVC.Upsert(ED,'UPDATE').subscribe(
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