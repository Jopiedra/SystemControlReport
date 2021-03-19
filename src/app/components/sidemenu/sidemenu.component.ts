import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
//import { Subscription } from 'rxjs';

import { Profile, Menu } from '../../models/AppDirectory';

import { AppDirectoryService } from '../../services/appdirectory.service';

@Component({
    selector: 'SideMenu'
    , templateUrl: 'sidemenu.component.html'
    , providers: [
        AppDirectoryService
    ]
})

export class SideMenuComponent implements OnInit {

    public Profiles: Profile[] = [];
    public CurrentRoute!: UrlSegment[]
    public CurrentPage: Profile = new Profile();


    constructor(
        private router: Router
        , private ActRoute: ActivatedRoute
        , private AppDirectorySVC: AppDirectoryService
    ) { }

    ngOnInit() {
        this.AppDirectorySVC.WebDirectoryByUser().subscribe(res => {
            this.Profiles = res;
            this.ActRoute.url.subscribe(
                res => {
                    this.CurrentRoute = res
                    let controller = this.CurrentRoute[0].path;
                    let page = "Index"
                    if (this.CurrentRoute[1] != undefined) {
                        page = this.CurrentRoute[1].path;
                        //console.log(page);
                    }

                    let currentpage = this.Profiles.find(x => x.Controller === controller && x.Page === page);

                    if(currentpage != undefined) {
                        this.CurrentPage = currentpage;
                    } else {
                        // let src = this.Profiles.find(x => x.Controller === controller);
                        // console.log(src);
                        // this.CurrentPage.AppName = src? src.AppName: 'Admin';
                        // this.CurrentPage.MainClass = src? src.MainClass : 'Administrator Tools';
                        // this.CurrentPage.Controller = controller;
                        // this.CurrentPage.Page = page;
                    }
                    //console.log(this.CurrentPage);
                }
            )
            //let g: UrlSegmentGroup = tree.root
        })
    }


}