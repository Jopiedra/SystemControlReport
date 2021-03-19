import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Computer } from '../models/Computers';
import { Parameters } from '../../assets/parameters';

import { AuthenticationService } from './authentication.service';

@Injectable()

export class ComputerService {
    constructor(
        private _http: HttpClient
        , private AuthSVC: AuthenticationService
    ) {    
    }

    List(): Observable<Computer[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<Computer[]>(Parameters.hostname + '/Computers', null, httpOptions);
    }    
   
    Upsert(Model: Computer, Type: string): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }

        return this._http.post<boolean>(Parameters.hostname + '/Computers/' + Type, Model, httpOptions);
    }
}