import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SharedFolder } from '../models/SharedFolder';
import { Parameters } from '../../assets/parameters';

import { AuthenticationService } from './authentication.service';

@Injectable()

export class SharedFoldersService {
    constructor(
        private _http: HttpClient
        , private AuthSVC: AuthenticationService
    ) {    
    }

    List(): Observable<SharedFolder[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<SharedFolder[]>(Parameters.hostname + '/SharedFolders', null, httpOptions);
    }    
   
    Upsert(Model: SharedFolder, Type: string): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }

        return this._http.post<boolean>(Parameters.hostname + '/SharedFolders/' + Type, Model, httpOptions);
    }
}