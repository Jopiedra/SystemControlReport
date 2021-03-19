import { Component, Input, OnInit } from '@angular/core';

import { RightRole } from '../../models/Roles';

import { RolesService } from '../../services/roles.services';

@Component({
    selector: 'RoleRights'
    , templateUrl: 'rights.component.html'
    , providers: [
        RolesService
    ]
})

export class RolesRightsComponent implements OnInit {

    public RightsList: RightRole[] = [];
    public RightToUpdate: RightRole = new RightRole();

    constructor(
        private RolesSVC: RolesService
    ) { }
    
    @Input() RoleID!: number
    
    ngOnInit() {
        this.RolesSVC.RigthsByRole(this.RoleID).subscribe(
            res => {
                this.RightsList = res;
                console.log(this.RightsList);
            }
        );
    }

    UpdateRight(model: RightRole, Type: string) {
        this.RightToUpdate.WriteRight = false;
        this.RightToUpdate.ReadRight = false;
        this.RightToUpdate.RoleID = this.RoleID;
        this.RightToUpdate.ProfileID = model.ProfileID;
        this.RightToUpdate.ApplicationID = model.ApplicationID;

        if(model.ReadRight == true && Type == "Read" )
        {
            this.RightToUpdate.WriteRight = false;
            this.RightToUpdate.ReadRight = false;            
        }         

        if(model.ReadRight == false && Type=="Read")
        {
            this.RightToUpdate.ReadRight = true;
            this.RightToUpdate.WriteRight = model.WriteRight;
        }

        if(model.WriteRight == true && Type=="Write")
        {
            this.RightToUpdate.ReadRight = model.ReadRight;
            this.RightToUpdate.WriteRight = false;
        }

        if(model.WriteRight == false && Type=="Write")
        {
            this.RightToUpdate.WriteRight = true;
            this.RightToUpdate.ReadRight = true;
        }

        this.RolesSVC.UpdateRight(this.RightToUpdate).subscribe(
            res => {
                if(res) {
                    this.ngOnInit();
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
}