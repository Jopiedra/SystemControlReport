import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ActivityDetails, AppUser, Login, RequestUserActivityData } from '../models/AppUsers';
import { Parameters } from '../../assets/parameters';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })

export class AppUsersService {
    constructor(
        private _http: HttpClient
        , private AuthSVC: AuthenticationService
    ) { }

    login(Model: Login): Observable<AppUser> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Basic " + btoa(Model.UserName + ":" + Model.Password)
            })
        }

        return this._http.post<AppUser>(Parameters.hostname + '/AppUsers/Login', null, httpOptions);
    }

    List(): Observable<AppUser[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<AppUser[]>(Parameters.hostname + '/AppUsers', null, httpOptions);
    }

    UserActivities(Model: RequestUserActivityData): Observable<AppUser>{
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<AppUser>(Parameters.hostname + '/AppUsers/History/', Model, httpOptions);
    }

    Upsert(Model: AppUser, Type: string): Observable<boolean> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<boolean>(Parameters.hostname + '/AppUsers/'+ Type, Model, httpOptions);
    }

    ActivityDetails(ID: number): Observable<ActivityDetails[]> {
        let currentuser = this.AuthSVC.currentUserValue;
        const httpOptions = {
            headers: new HttpHeaders({
                "Access-Control-Allow-Headers": "Content-Type"
                , "content-type": "application/json"
                , "Access-Control-Allow-Origin": "*"
                , "Authorization": "Bearer " + currentuser.Token
            })
        }        
        return this._http.post<ActivityDetails[]>(Parameters.hostname + '/AppUsers/Activity/' + ID, null, httpOptions);
    }
}