import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { EmailDirectory } from '../models/EmailDirectory';
import { Parameters } from '../../assets/parameters';

import { AuthenticationService } from './authentication.service';

@Injectable()

export class EmailDirectoryService {
    constructor(
        private _http: HttpClient
        , private AuthSVC: AuthenticationService
    ) {    
    }

    List(): Observable<EmailDirectory[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<EmailDirectory[]>(Parameters.hostname + '/EmailDirectory', null, httpOptions);
    }    
   
    Upsert(Model: EmailDirectory, Type: string): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }

        return this._http.post<boolean>(Parameters.hostname + '/EmailDirectory/' + Type, Model, httpOptions);
    }
}