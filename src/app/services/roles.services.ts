import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Roles, RightRole } from '../models/Roles';
import { Parameters } from '../../assets/parameters';

import { AuthenticationService } from './authentication.service';

@Injectable()

export class RolesService {
    constructor(
        private _http: HttpClient
        , private AuthSVC: AuthenticationService
    ) {    
    }

    List(): Observable<Roles[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<Roles[]>(Parameters.hostname + '/Roles', null, httpOptions);
    }
    
    RigthsByRole(RoleID: number): Observable<RightRole[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }       

        return this._http.post<RightRole[]>(Parameters.hostname + '/Roles/Rights/' + RoleID, null, httpOptions);
    }

    UpdateRight(Model: RightRole): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }

        return this._http.post<boolean>(Parameters.hostname + '/Roles/Update', Model, httpOptions);
    }

    Create(Model: Roles): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }

        return this._http.post<boolean>(Parameters.hostname + '/Roles/Create', Model, httpOptions);
    }
}