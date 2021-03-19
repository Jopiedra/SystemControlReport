import { Component, OnInit } from '@angular/core';

import { Profile, Menu } from '../../models/AppDirectory';

import { AppDirectoryService } from '../../services/appdirectory.service';

@Component({
    selector: 'HomePage'
    , templateUrl: 'home.component.html'
    , providers: [
        AppDirectoryService
    ],
    styles: [
        `
        ::ng-deep .ant-card-head {
            background-color: black;
            color: white;
        }
        ::ng-deep .ant-card {
            height: 100%;
        }        
        ::ng-deep .ant-card-body {
            padding: 1rem;
        }
        ::ng-deep .ant-breadcrumb>nz-breadcrumb-item:last-child, .ant-breadcrumb>nz-breadcrumb-item:last-child a, .ant-btn {
            font-weight: 600;
        }
        `
    ]
})

export class HomePageComponent implements OnInit {

    public DirectoryList: Profile[] = [];
    public Directory: Menu[] = []

    constructor(
        private AppDirectorySVC: AppDirectoryService
    ) { }

    ngOnInit() {

        this.AppDirectorySVC.WebDirectoryByUser().subscribe(
            res => {
                this.DirectoryList = res;
                let distinc = [...new Set(this.DirectoryList.map(x => x.MainClass))]
                for(let i = 0; i < distinc.length;i++)
                {
                    const menu: Menu = new Menu();
                    menu.MainClass = distinc[i];
                    menu.Directory = this.DirectoryList.filter(x => x.MainClass == distinc[i]);
                    this.Directory.push(menu);
                }
                //console.log(this.Directory);
            }
        );        
    }
}