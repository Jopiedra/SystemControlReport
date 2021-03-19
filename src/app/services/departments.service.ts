import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Department } from '../models/Departments';
import { Parameters } from '../../assets/parameters';

import { AuthenticationService } from './authentication.service';

@Injectable()

export class DepartmentService {
    constructor(
        private _http: HttpClient
        , private AuthSVC: AuthenticationService
    ) {    
    }

    List(): Observable<Department[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<Department[]>(Parameters.hostname + '/Departments', null, httpOptions);
    }    
   
    Upsert(Model: Department, Type: string): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }

        return this._http.post<boolean>(Parameters.hostname + '/Departments/' + Type, Model, httpOptions);
    }
}